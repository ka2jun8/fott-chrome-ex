declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import {EventEmitter} from "eventemitter3";
import * as _ from "underscore";
import { FirebaseWrapper, UserProfile, TextInfo, PathMap, ListInfo, __DefaultList } from "../src-common/firebase";
const Config = require("../setting.json");

import {Login} from "../src-common/login";
import {Form} from "./form";
import {Report} from "./report";

export interface FottExState {
  fb: FirebaseWrapper,
  userProfile: UserProfile,
  logined: boolean,
  loginView: boolean,
  emitter: EventEmitter,
  loading: boolean,
  lists: ListInfo[],
  title: string,
  image: string,
  src: string,
  formContent: string,
  reportContent: string,
  reported: boolean,
}

export interface ContentScriptResponse {
  title: string,
  image: string,
  src: string,
}

export class Main extends React.Component<any, FottExState> {
  constructor() {
    super();
  }

  state: FottExState = {
    fb: new FirebaseWrapper(Config),
    userProfile: null,
    logined: false,
    loginView: false,
    emitter: new EventEmitter(),
    loading: true,
    lists: [],
    title: "",
    image: "",
    src: "",
    formContent: "",
    reportContent: "",
    reported: false,
  }

  style: any = {
    main: {
      width: 300,
      height: 150, //TODO
      margin: 5,
    }
  }

  componentDidMount() {
    const userProfileStr = localStorage.getItem("userProfile");
    if(userProfileStr) {
      const userProfile = JSON.parse(userProfileStr);
      this.chromeContentMessage();
      setTimeout(this.updateListInfo.bind(this), 0);
      this.setState({userProfile, logined: true});
    }

    this.state.emitter.on("register", (listId: string, text: string)=>{
      const state: TextInfo = {
        title: this.state.title,
        url: this.state.src,
        image: this.state.image,
        text: text,
        star: 3,
        public: false,
      };
      const _id = this.state.fb.generateId(this.state.userProfile, PathMap.Text+"/"+listId);
      let reportContent = "";
      this.state.fb.pushText(this.state.userProfile, listId, _id, state).then(() => {
        reportContent = "Succeed Register!";
        this.setState({reported: true, reportContent});
      }).catch((error) => {
        reportContent = "Failed Register..." + JSON.stringify(error);
        console.error(error);
      });
    });

  }

  onLogin(userProfile: UserProfile) {
    if(userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      this.chromeContentMessage();
      setTimeout(this.updateListInfo.bind(this), 0);
      this.setState({userProfile, logined: true});
    }
  }

  onClickLogin() {
    this.setState({loginView: !this.state.loginView});
  }

  onLogout() {
    localStorage.removeItem("userProfile");
    this.state.fb.signOut();
    this.setState({logined: false});
  }

  updateListInfo(): Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.state.fb.getList(this.state.userProfile).then((result)=>{
        if(result.length > 0) {
          this.setState({lists: result});
        }else {
          this.state.fb.createList(this.state.userProfile, __DefaultList, {
            title: "Your Text List",
          }).then(()=>{
            this.setState({lists: [{
              __id: __DefaultList,
              title: "Your Text List",
            }]});
          }).catch((error)=>console.error);
        }
        resolve();
      }).catch((error)=>{
        console.error(error);
        reject();
      });
    });
  }

  chromeContentMessage() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "start" }, (response: ContentScriptResponse) => {
        // console.log("chrome content_script response", response);
        if(!response) {
          response = {title: "", image: "", src: ""};
        }
        const newState = _.assign({}, this.state, {loading: false}, response);
        this.setState(newState);
      });
    });
  }

  render() {
    const spinnerView = (
      <img src="./resources/Spinner.svg"/>
    );

    const mainContent = this.state.reported ? 
      <Report {...this.state}/>
      :
      <Form {...this.state}/>
      ;

    const checkLoading = this.state.loading ? spinnerView : mainContent;

    const needLogin = (
      <div>
      You need to sign in.
      <Button onClick={this.onClickLogin.bind(this)}>Login</Button>
      <Modal
        show={this.state.loginView}
        onHide={close}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login fb={this.state.fb} onLogin={this.onLogin.bind(this)}/>
        </Modal.Body>
      </Modal>
    </div>
  );

    const mainView = this.state.logined ? 
      checkLoading
        :
      needLogin
      ;

    return (
      <div style={this.style.main}>
        {mainView}
      </div>
    );
  }

}


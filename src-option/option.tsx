declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button, Modal, PanelGroup, Panel } from "react-bootstrap";
import {EventEmitter} from "eventemitter3";
import * as _ from "underscore";
import { FirebaseWrapper, UserProfile, TextInfo } from "../src-common/firebase";
const Config = require("../setting.json");

import {Login} from "../src-common/login";

export interface FottOpState {
  fb: FirebaseWrapper,
  userProfile: UserProfile,
  logined: boolean,
  loading: boolean,
  loginView: boolean,
}

export class Option extends React.Component<any, FottOpState> {
  constructor() {
    super();
  }

  state: FottOpState = {
    fb: new FirebaseWrapper(Config),
    userProfile: null,
    logined: false,
    loading: true,
    loginView: false,
  }

  style: any = {
    main: {
    }
  }

  componentDidMount() {
    const userProfileStr = localStorage.getItem("userProfile");
    if(userProfileStr) {
      const userProfile = JSON.parse(userProfileStr);
      this.setState({userProfile, logined: true});
    }
    this.setState({loading: false});
  }

  onLogin(userProfile: UserProfile) {
    if(userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      this.setState({userProfile, logined: true});
    }
  }

  onLogout() {
    localStorage.removeItem("userProfile");
    this.state.fb.signOut();
    this.setState({logined: false});
  }

  onClickLogin() {
    this.setState({loginView: !this.state.loginView});
  }

  render() {
    const spinnerView = (
      <img src="./resources/Spinner.svg"/>
    );

    const LoginOption = !this.state.logined? (
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
    ): (
      <div>
        You singed in with username: [ {this.state.userProfile && this.state.userProfile.displayName} ]
        <Button onClick={this.onLogout.bind(this)}>Logout</Button>
      </div>
    );

    const mainContent = (
      <PanelGroup>
        <Panel collapsible header="Login" defaultExpanded={true} eventKey="1">{LoginOption}</Panel>
        <Panel collapsible header="Option 2" defaultExpanded={true} eventKey="2">Option2</Panel>
        <Panel collapsible header="Option 3" defaultExpanded={true} eventKey="3">Option3</Panel>
      </PanelGroup>
    );

    const checkLoading = this.state.loading ? spinnerView : mainContent;

    return (
      <div style={this.style.main}>
        {checkLoading}
      </div>
    );
  }

}


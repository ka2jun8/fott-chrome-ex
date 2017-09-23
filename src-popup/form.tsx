declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import {TextInfo, __DefaultList} from "../src-common/firebase";

export class Form extends React.Component<any, any> {
  constructor() {
    super();
  }

  state: any = {
    listId: __DefaultList,
    formContent: "",
  }

  style: any = {
    column: {
      display: "flex",
      flexDirection: "column",
      margin: 5,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      margin: 5,
    },
    margin: {
      margin: 5,
    }
  }

  onClick() {
    this.props.emitter.emit("register", this.state.listId, this.state.formContent);
  }

  onChange(e) {
    this.setState({formContent: e.target.value});
  }

  onChangeList(e) {
    this.setState({listId: e.target.value});
  }

  render() {
    const textArea = (
      <FormGroup controlId="formControlsTextarea">
        <FormControl style={{height: 100}} componentClass="textarea" value={this.state.formContent} onChange={this.onChange.bind(this)} placeholder="YOUR TEXT" />
      </FormGroup>
    );

    const lists = this.props.lists.map((list, i)=>{
      return <option key={i} value={list.__id}>{list.title}</option>;
    });
    const selectListView = (
      <FormControl value={this.state.listId} onChange={this.onChangeList.bind(this)} componentClass="select">
        {lists}
      </FormControl>
    );

    return (
      <div>
        <div style={this.style.column}>
          {textArea}
          <div style={this.style.row}>
            <div style={this.style.margin}>
              {selectListView}
            </div>
            <div style={this.style.margin}>
            <Button onClick={this.onClick.bind(this)}>登録</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


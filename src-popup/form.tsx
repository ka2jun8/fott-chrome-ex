declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import {TextInfo, __DefaultList} from "../src-common/firebase";
import {SelectList} from "./select-list";
import {FottExState} from "./main";
import {Star} from "./star";

export interface FormState {
  listId: string,
  formContent: string,
  star: number,
}

export class Form extends React.Component<FottExState, FormState> {
  constructor() {
    super();
  }

  state: FormState = {
    listId: __DefaultList,
    formContent: "",
    star: 3,
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

  onChangeText(e) {
    this.setState({formContent: e.target.value});
  }

  onChangeStar(star) {
    this.setState({star});
  }

  onChangeList(listId) {
    this.setState({listId});
  }

  render() {
    const textArea = (
      <FormGroup controlId="formControlsTextarea">
        <FormControl style={{height: 100}} componentClass="textarea" value={this.state.formContent} onChange={this.onChangeText.bind(this)} placeholder="YOUR TEXT" />
      </FormGroup>
    );

    return (
      <div>
        <div style={this.style.column}>
          {textArea}
          <Star star={this.state.star} onClick={this.onChangeStar.bind(this)}/>
          <div style={this.style.row}>
            <div style={this.style.margin}>
              <SelectList lists={this.props.lists} selectedId={this.state.listId} onSelect={this.onChangeList.bind(this)}/>
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


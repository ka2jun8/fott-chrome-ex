declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import {TextInfo} from "../src-common/firebase";

export class Form extends React.Component<any, any> {
  constructor() {
    super();
  }

  state: any = {
    formContent: "",
  }

  style: any = {
  }

  onClick() {
    this.props.emitter.emit("onClickRegister", this.state.formContent);
  }

  onChange(e) {
    this.setState({formContent: e.target.value});
  }

  render() {
    const textArea = (
      <FormGroup controlId="formControlsTextarea">
        <FormControl style={{height: 100}} componentClass="textarea" value={this.state.formContent} onChange={this.onChange.bind(this)} placeholder="YOUR TEXT" />
      </FormGroup>
    );
    return (
      <div>
        <div>
          {textArea}
          <Button onClick={this.onClick.bind(this)}>登録</Button>
        </div>
      </div>
    );
  }

}


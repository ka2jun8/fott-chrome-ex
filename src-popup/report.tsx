declare const chrome;
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Button } from "react-bootstrap";
import {TextInfo} from "../src-common/firebase";

export class Report extends React.Component<any, any> {
  constructor() {
    super();
  }

  style: any = {
  }

  onClick() {
    window.close();
  }

  //TODO 自動で閉じる
  render() {
    const content = this.props.reportContent || "Unreported...";
    return (
      <div>
        <div>
          {content}
        </div>
        <div>
          <Button onClick={this.onClick.bind(this)}>Close</Button>
        </div>
      </div>
    );
  }

}


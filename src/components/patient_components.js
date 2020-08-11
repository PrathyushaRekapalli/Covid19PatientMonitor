import React, { Component } from "react";
import { VitalsTable2 } from "./vitalstable2";
export class Details extends Component {
  render() {
    return (
      <div className="App">
        <h2>Hello Details</h2>
      </div>
    );
  }
}

export class Vitals extends Component {
  render() {
    return (
      <div>
        <span id="health">HEALTH INFORMATION</span>
        <div>
          {/* <StylesProvider >  */}
          <VitalsTable2 id={1046} />
          {/* </StylesProvider> */}
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from "react"; //PureComponent 를 사용하면 기본적인건 변경됐나 확인해서 체크하는데 오브젝트나 배열은 잘 체크못한다
import { useState } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
    string: "hello",
    number: 1,
    boolean: true,
    object: {},
    array: [],
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     if(counter !== nextState.counter){
  //         return true;
  //     }
  //     return false;
  // }

  onClick = () => {
    this.setState({
      array: [...this.state.array, 1],
    });
  };

  render() {
    console.log("렌더링", this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}
export default Test;

import React, { Component, memo } from "react";
// class Try extends Component {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>
//           <b>{tryInfo.try}</b>
//         </div>
//         <div>
//           <b>{tryInfo.result}</b>
//         </div>
//       </li>
//     );
//   }
// }

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

// 위랑 같음
// const TRY = (props) => {
//     return (
//       <li>
//         <div>{props.tryInfo.try}</div>
//         <div>{props.tryInfo.result}</div>
//       </li>
//     );
//   };

export default Try;

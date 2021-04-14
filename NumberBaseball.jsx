//const React = require("react");
import React, { Component, memo } from "react";
const { useState, useRef } = React;
//const { Component } = React;
import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

// class NumberBaseball extends Component {
//   state = {
//     result: "",
//     value: "",
//     answer: getNumbers(),
//     tries: [],
//   };

//   onSubmitForm = (e) => {
//     const { value, tries, answer } = this.state;
//     e.preventDefault();
//     console.log(answer);
//     if (value.length < 4) {
//       alert("숫자 4개를 입력하시오");
//     } else {
//       if (value === answer.join("")) {
//         // 문자.split('') -> 배열 // 배열.join('') -> 문자
//         this.setState({
//           result: "홈런!",
//         });
//         alert("게임을 다시 시작합니다!");
//         this.setState({
//           value: "",
//           answer: getNumbers(),
//           tries: [],
//         });
//       } else {
//         const answerArray = value.split("").map((v) => parseInt(v));
//         let strike = 0;
//         let ball = 0;
//         if (tries.length >= 9) {
//           this.setState({
//             result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")} 였습니다.`,
//           });
//           alert("게임을 다시 시작합니다!");
//           this.setState({
//             value: "",
//             answer: getNumbers(),
//             tries: [],
//           });
//         } else {
//           for (let i = 0; i < 4; i += 1) {
//             if (answerArray[i] === answer[i]) {
//               strike += 1;
//             } else if (answer.includes(answerArray[i])) {
//               ball += 1;
//             }
//           }
//           this.setState({
//             tries: [
//               ...tries,
//               {
//                 try: value,
//                 result: `${strike}스트라이크 , ${ball}볼 입니다.`,
//               },
//             ],
//             value: "",
//           });
//         }
//       }
//     }
//   };
//   onChangeInput = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     // class 에서는 state가 바뀔때마다 render() 안쪽 부분이 재실행됨
//     const { result, value, tries } = this.state;
//     return (
//       <>
//         <h1>{result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input maxLength={4} value={value} onChange={this.onChangeInput} />
//         </form>
//         <div>시도: {tries.length} </div>
//         <ul>
//           {/* {[
//             ["사과", "맛있다"],
//             ["배", "맛있다"],
//             ["바나나", "맛있다"],
//             ["귤", "맛있다"],
//             ["밤", "맛없다"],
//           ].map((v) => {
//             return (
//               <li>
//                 <b>{v[0]}</b> - {v[1]}
//               </li>
//             );
//           })} */}
//           {tries.map((v, i) => {
//             return <Try key={`${i + 1}차 시도:`} tryInfo={v} />; // key는 고유한 값이여야 한다
//           })}
//         </ul>
//       </>
//     );
//   }
// }

const NumberBaseball = memo(() => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(answer);
    if (value.length < 4) {
      alert("숫자 4개를 입력하시오");
    } else {
      if (value === answer.join("")) {
        // 문자.split('') -> 배열 // 배열.join('') -> 문자
        setResult("홈런!");
        setValue("");
        setAnswer(getNumbers());
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: "홈런!" }];
        });
        alert("게임을 다시 시작합니다!");
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(
            `10번 넘게 틀려서 실패! 답은 ${answer.join(",")} 였습니다.`
          );
          alert("게임을 다시 시작합니다!");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
        } else {
          for (let i = 0; i < 4; i += 1) {
            if (answerArray[i] === answer[i]) {
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              ball += 1;
            }
          }
          setValue("");
          setTries((prevTries) => {
            return [
              ...prevTries,
              { try: value, result: `${strike}스트라이크 , ${ball}볼 입니다.` },
            ];
          });
        }
      }
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
      </form>
      <div>시도: {tries.length} </div>
      <ul>
        {(() => {
          const array = [];
          for (let i = 0; i < tries.length; i++) {
            array.push(<Try key={`${i + 1}차 시도:`} tryInfo={v} />);
          }
          return array;
        })()}

        {/* {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도:`} tryInfo={v} />; // key는 고유한 값이여야 한다
        })} */}
      </ul>
    </>
  );
});

export default NumberBaseball;
//module.exports = NumberBaseball;
//export default NumberBaseball;  는 가져올때 import NumberBaseball;
//export const hello = 'hello';   는 가져올때 import { hello } 이런식으로 사용

//module.exports = { hello: 'a'};   ===   exports.hello = 'a'

// Node 에서는 const / require만 지원하고 , react 에서는 import 와 export트를 지원한다
// 허나 둘 다 사용 가능한 이유는 babel 때문

import React, { Component } from "react"; //class 에서 사용
import { useState, useRef, useEffect } from "react"; // hooks에서 사용

const rspMap = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgMap) => {
  return Object.entries(rspMap).find(function (v) {
    return v[1] === imgMap;
  })[0];
};

// class RSP extends Component {
//   state = {
//     result: "",
//     imgMap: "0",
//     score: 0,
//   };

//   interval;

//   componentDidMount() {
//     // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 함
//     this.interval = setInterval(this.changeHand, 50);
//   }

//   componentWillUnMount() {
//     // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
//     clearInterval(this.interval);
//   }

//   changeHand = () => {
//     const { imgMap } = this.state;
//     if (imgMap === rspMap.바위) {
//       this.setState({
//         imgMap: rspMap.가위,
//       });
//     } else if (imgMap === rspMap.가위) {
//       this.setState({
//         imgMap: rspMap.보,
//       });
//     } else if (imgMap === rspMap.보) {
//       this.setState({
//         imgMap: rspMap.바위,
//       });
//     }
//   };

//   onClick = () => {
//     if (this.state.rspMap[0] === "바위") {
//       this.conClickBtn("바위");
//     } else if (this.state.rspMap[0] === "가위") {
//       this.conClickBtn("가위");
//     } else if (this.state.rspMap[0] === "보") {
//       this.conClickBtn("보");
//     }
//   };

//   onClickBtn = (choice) => {
//     const { imgMap } = this.state;
//     clearInterval(this.interval);
//     const myScore = scores[choice];
//     const cpuScore = scores[computerChoice(imgMap)];
//     const diff = myScore - cpuScore;
//     if (diff === 0) {
//       this.setState({
//         result: "비겼습니다.",
//       });
//     } else if ([-1, 2].includes(diff)) {
//       this.setState((prevState) => {
//         return {
//           result: "이겼습니다.",
//           score: prevState.score + 1,
//         };
//       });
//     } else {
//       this.setState((prevState) => {
//         return {
//           result: "졌습니다.",
//           score: prevState.score - 1,
//         };
//       });
//     }
//     setTimeout(() => {
//       this.interval = setInterval(this.changeHand, 50);
//     }, 500);
//   };

//   render() {
//     const { result, score, imgMap } = this.state;
//     return (
//       <>
//         <div
//           id="computer"
//           style={{
//             background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgMap} 0`,
//           }}
//         ></div>
//         <div>
//           <button
//             id="rock"
//             className="btn"
//             onClick={() => this.conClickBtn("바위")}
//           >
//             바위
//           </button>
//           <button
//             id="scissor"
//             className="btn"
//             onClick={() => this.conClickBtn("가위")}
//           >
//             가위
//           </button>
//           <button
//             id="paper"
//             className="btn"
//             onClick={() => this.conClickBtn("보")}
//           >
//             보
//           </button>
//         </div>
//         <div>{result}</div>
//         <div>현재 {score} 점</div>
//       </>
//     );
//   }
// }

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgMap, setImgMap] = useState("0");
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(() => {
    //componentDidMount, componentDidUpdate 역할 수행
    interval.current = setInterval(changeHand, 100);

    return () => {
      // conponentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgMap]); // 이곳 배열에 들어간 값이 변경될때 useEffect가 재실행된다.

  const changeHand = () => {
    if (imgMap === rspMap.바위) {
      setImgMap(rspMap.가위);
    } else if (imgMap === rspMap.가위) {
      setImgMap(rspMap.보);
    } else if (imgMap === rspMap.보) {
      setImgMap(rspMap.바위);
    }
  };

  const onClickBtn = (choice) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgMap)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevState) => prevState + 1);
    } else {
      setResult("졌습니다.");
      setScore((prevState) => prevState - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 500);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgMap} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={() => onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={() => onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={() => onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
};

export default RSP;

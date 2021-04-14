import React, {
  PureComponent,
  useState,
  useRef,
  useEffect,
  useMemo,
  memo,
  useCallback,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNum");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  console.log(candidate);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bounsNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  console.log(winNumbers);
  return [...winNumbers, bounsNumber];
}

// class Lotto extends PureComponent {
//   state = {
//     winNumbers: getWinNumbers(),
//     winBalls: [],
//     bonus: null,
//     redo: false,
//   };

//   timeouts = [];

//   runTimeouts = () => {
//     const { winNumbers } = this.state;
//     for (let i = 0; i < winNumbers.length - 1; i++) {
//       console.log({ winNumbers });
//       this.timeouts[i] = setTimeout(() => {
//         this.setState((prevState) => {
//           return { winBalls: [...prevState.winBalls, winNumbers[i]] };
//         });
//       }, (i + 1) * 1000);
//     }
//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };

//   componentDidMount() {
//     this.runTimeouts();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//     if (prevState.winNumbers !== this.state.winNumbers) {
//          console.log('로또 숫자를 생성합니다.')
//      }
//   }

//   componentWillUnmount() {
//     this.timeouts.forEach((v) => {
//       chearTimeout(v);
//     });
//   }

//   onClickRedo = () => {
//     this.setState({
//       winNumbers: getWinNumbers(),
//       winBalls: [],
//       bonus: null,
//       redo: false,
//     });
//     this.timeouts = [];
//   };

//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="결과창">
//           {winBalls.map((v) => (
//             <Ball key={v} number={v} />
//           ))}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
//       </>
//     );
//   }
// }

const Lotto = memo(() => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo를 이용해서 getWinNumbers()값을 기억한다
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      console.log({ winNumbers });
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
  }, [winBalls]);

  const onClickRedo = useCallback(() => {
    // 함수 자체를 기억 (자식컴포넌트에 프롭스로 함수를 넘길땐 useCallback 필수 안쓰면 매번 새로운 함수가 생성)
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, []);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
});

export default Lotto;

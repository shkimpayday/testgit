import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMassage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      timeout.current = setTimeout(() => {
        setState("now");
        setMassage("지금 클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤
      setState("ready");
      setMassage("초록색이 되면 클릭하세요.");
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(timeout.current);
      setState("waiting");
      setMassage("너무 성급하시군요 초록색이 된 후에 클릭하세요.");
    } else if (state === "now") {
      //반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setMassage("클릭해서 시작하세요.");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };
  //   const renderAverge = () => {
  //     return result.length === 0 ? null : (
  //       <>
  //         <div>
  //           평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms
  //         </div>
  //         <button onClick={onReset}>리셋</button>
  //       </>
  //     );
  //   };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {(() => {
        if (result.length === 0) {
          return null;
        } else {
          return (
            <>
              <div>
                평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms
              </div>
              <button onClick={onReset}>리셋</button>
            </>
          );
        }
      })()}

      {/*{renderAverge()}*/}
    </>
  );
};
export default ResponseCheck;

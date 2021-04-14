const React = require("react");

/*
class WordRelay extends React.Component {
  state = {
    word: "초기값",
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        word: this.state.value,
        value: "",
        result: "딩동댕!",
      });
      this.input.focus();
    } else {
      this.setState({
        word: this.state.word,
        value: "",
        result: "땡!!",
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
*/

const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("초기값");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);
  onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult("딩동댕~!");
      inputRef.current.focus();
    } else {
      setWord(word);
      setValue("");
      setResult("땡~!");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};
module.exports = WordRelay;

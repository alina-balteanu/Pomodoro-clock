import React, { Component } from "react";
import LenControl from "./components/LenControl";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLen: 5,
      sessionLen: 25,
      countdownText: "session",
      countdownSeconds: 1500,
      intId: null
    };
  }
  componentDidMount() {
    //animate when first loaded
    // let flickerColon = document.querySelector(".colon");
    // flickerColon.style.animation = "flickerColon 1s infinite";
    // this.resetAll();
    this.setState({
      breakLen: 5,
      sessionLen: 25,
      countdownText: "session",
      countdownSeconds: 1500,
      intId: null
    });
  }

  resetAll = () => {
    this.setState({
      breakLen: 5,
      sessionLen: 25,
      countdownText: "session",
      countdownSeconds: 1500,
      intId: null
    });
    clearInterval(this.state.intId);
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.pause();
  };
  incdecLen = e => {
    if (/session/.test(e.currentTarget.id)) {
      this.setState({
        sessionLen:
          e.currentTarget.value === "+"
            ? this.state.sessionLen < 60
              ? this.state.sessionLen + 1
              : this.state.sessionLen
            : this.state.sessionLen > 1
            ? this.state.sessionLen - 1
            : this.state.sessionLen
      });
    } else {
      this.setState({
        breakLen:
          e.currentTarget.value === "+"
            ? this.state.breakLen < 60
              ? this.state.breakLen + 1
              : this.state.breakLen
            : this.state.breakLen > 1
            ? this.state.breakLen - 1
            : this.state.breakLen
      });
    }
  };

  countDownTime = () => {
    let minutes = Math.floor(this.state.countdownSeconds / 60);
    let seconds = this.state.countdownSeconds - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return (
      minutes + ":" + seconds
      // <div>
      //   {minutes}
      //   <span
      //     className="colon"
      //     style={{
      //       animation: this.state.intId ? "flickerColon 1s infinite" : "none"
      //     }}
      //   >
      //     :
      //   </span>
      //   {seconds}
      // </div>
    );
  };

  startCountdown = () => {
    if (!this.state.intId) {
      this.setState({
        intId: setInterval(() => {
          this.setState({
            countdownSeconds: this.state.countdownSeconds - 1
          });
          this.togglePhase();
        }, 1000)
      });
    } else {
      clearInterval(this.state.intId);
      this.setState({
        intId: null
      });
    }
  };

  togglePhase = () => {
    if (this.state.countdownSeconds < 0) {
      this.setState({ countdownSeconds: 0 });

      this.playSound();
      if (this.state.countdownText === "session") {
        clearInterval(this.state.intId);
        this.setState({
          countdownText: "break",
          intId: null,
          countdownSeconds: this.state.breakLen * 60
        });
        this.startCountdown();
      } else {
        clearInterval(this.state.intId);
        this.setState({
          countdownText: "session",
          intId: null,
          countdownSeconds: this.state.sessionLen * 60
        });
        this.startCountdown();
      }
    }
  };

  playSound = () => {
    const sound = document.getElementById("beep");
    if (this.state.countdownSeconds === 0) {
      sound.currentTime = 0;
      sound.volume = 35 / 100;
      sound.play();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="pomodoro-wrapper">
          <div className="countdown-ctrl-wrapper">
            <button id="start_stop" onClick={this.startCountdown}>
              <i className="fas fa-play fa-2x" />{" "}
              <i className="fas fa-pause fa-2x" />
            </button>
            <button id="reset" onClick={this.resetAll}>
              {" "}
              <i className="fas fa-sync-alt fa-2x" />
            </button>
          </div>
          <div className="countdown-wrapper">
            <div className="countdown-display-wrapper">
              <img
                className="tomato"
                src="https://res.cloudinary.com/dshmwg7vw/image/upload/v1552312290/tomato.svg"
                alt="tomato"
              />
              <div id="time-left" className="time-text">
                {this.countDownTime()}
              </div>
              <div id="timer-label">{this.state.countdownText}</div>
            </div>
          </div>
          <div className="time-controls">
            <LenControl
              ctrlName="break-label"
              strName="break length"
              btnInc="break-increment"
              btnDec="break-decrement"
              ctrlLen={this.state.breakLen}
              ctrlLenId="break-length"
              incdecLen={this.incdecLen}
            />
            <LenControl
              ctrlName="session-label"
              strName="session length"
              btnInc="session-increment"
              btnDec="session-decrement"
              ctrlLen={this.state.sessionLen}
              ctrlLenId="session-length"
              incdecLen={this.incdecLen}
            />
          </div>
        </div>
        <div className="audio">
          <audio
            id="beep"
            preload="auto"
            src="https://res.cloudinary.com/dshmwg7vw/video/upload/v1552317990/Notice-sound-effect.mp3"
          />
        </div>
      </div>
    );
  }
}
export default App;

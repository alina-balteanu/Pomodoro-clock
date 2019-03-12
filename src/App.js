import React, { Component } from "react";
import LenControl from "./components/LenControl";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLen: 2,
      sessionLen: 5,
      countdownText: "session",
      countdownSeconds: 300,
      intId: null,
      rememberMax: 0
    };
  }
  componentDidMount() {
    //animate when first loaded
    let flickerColon = document.querySelector(".colon");
    flickerColon.style.animation = "flickerColon 1s infinite";
    let rememberMax = this.state.countdownSeconds;
    this.setState({
      rememberMax: rememberMax
    });

    this.setState({
      breakLen: 2,
      sessionLen: 5,
      countdownText: "session",
      countdownSeconds: 300,
      intId: null
    });
  }
  componentDidUpdate(prevProps, prevstate) {
    if (this.state.countdownText !== prevstate.countdownText) {
      let rememberMax = this.state.countdownSeconds;
      this.setState({
        rememberMax: rememberMax
      });
    }
  }

  resetAll = () => {
    this.setState({
      breakLen: 2,
      sessionLen: 5,
      countdownText: "session",
      countdownSeconds: 300,
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
      // minutes + ":" + seconds
      <div>
        {minutes}
        <span
          className="colon"
          style={{
            animation: this.state.intId ? "flickerColon 1s infinite" : "none"
          }}
        >
          :
        </span>
        {seconds}
      </div>
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
          this.tomatoLoader();
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

  tomatoLoader = () => {
    let percent = (this.state.countdownSeconds / this.state.rememberMax) * 100;

    const loader = document.querySelector(".loader");
    const radius = loader.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    loader.style.strokeDasharray = `${circumference} ${circumference}`;
    loader.style.strokeDashoffset = circumference;

    let offset = circumference - (percent / 100) * circumference;
    loader.style.strokeDashoffset = offset;
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
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 504 504"
                style={{ enableBackground: "new 0 0 504 504" }}
              >
                <circle className="st2" cx="252" cy="274.4" r="229.6" />
                <path
                  className="st3"
                  d="M252,44.8c126.4,0,229.6,102.4,229.6,229.6C481.6,400.8,379.2,504,252,504"
                />
                <circle className="st4" cx="252" cy="274.4" r="182.4" />
                <path
                  className="st5"
                  d="M252,92c100.8,0,182.4,81.6,182.4,182.4S352.8,456.8,252,456.8"
                />
                <circle className="st6" cx="252" cy="274.4" r="146.4" />
                <path
                  className="st7"
                  d="M252,128c80.8,0,146.4,65.6,146.4,146.4S332.8,420.8,252,420.8"
                />
                <rect x="220" y="116" className="st5" width="64" height="312" />

                <rect x="220" y="116" className="st4" width="32" height="312" />
                <circle className="st4" cx="252" cy="274.4" r="56" />

                <path
                  className="st5"
                  d="M252,218.4c31.2,0,56,25.6,56,56c0,31.2-24.8,56-56,56"
                />

                <path
                  className="seed"
                  d="M189.6,358.4L189.6,358.4l8-31.2l-28,16l0,0c-1.6,0.8-3.2,2.4-4.8,4c-4.8,6.4-3.2,15.2,2.4,19.2
		c6.4,4.8,15.2,3.2,19.2-2.4C188.8,362.4,189.6,360,189.6,358.4z"
                />
                <path
                  className="seed"
                  d="M158.4,312L158.4,312l24-22.4l-32.8-1.6l0,0c-1.6,0-4,0-5.6,0.8c-7.2,2.4-11.2,10.4-8,17.6
		c2.4,7.2,10.4,11.2,17.6,8C155.2,314.4,156.8,313.6,158.4,312z"
                />
                <path
                  className="seed"
                  d="M149.6,255.2L149.6,255.2l32.8-0.8L159.2,232l0,0c-1.6-1.6-3.2-2.4-4.8-3.2c-7.2-3.2-15.2,0.8-18.4,8
		c-2.4,7.2,0.8,15.2,8,18.4C145.6,254.4,147.2,255.2,149.6,255.2z"
                />
                <path
                  className="seed"
                  d="M169.6,205.6L169.6,205.6l28,15.2l-8-32.8l0,0c-0.8,0-1.6-2.4-2.4-4c-4.8-6.4-13.6-6.4-19.2-2.4
		c-6.4,4.8-7.2,13.6-2.4,20C166.4,203.2,168,204.8,169.6,205.6z"
                />

                <path
                  className="seed"
                  d="M334.4,205.6L334.4,205.6l-28,15.2l8-32.8l0,0c0.8,0,1.6-2.4,2.4-4c4.8-6.4,13.6-6.4,19.2-2.4
		c6.4,4.8,7.2,13.6,2.4,20C337.6,203.2,336,204.8,334.4,205.6z"
                />
                <path
                  className="seed"
                  d="M354.4,255.2L354.4,255.2l-32.8-0.8l23.2-22.4l0,0c1.6-1.6,3.2-2.4,4.8-3.2c7.2-3.2,15.2,0.8,18.4,8
		c2.4,7.2-0.8,15.2-8,18.4C358.4,254.4,356.8,255.2,354.4,255.2z"
                />
                <path
                  className="seed"
                  d="M345.6,312L345.6,312l-24-22.4l32.8-1.6l0,0c1.6,0,4,0,5.6,0.8c7.2,2.4,11.2,10.4,8,17.6
		c-2.4,7.2-10.4,11.2-17.6,8C348.8,314.4,347.2,313.6,345.6,312z"
                />
                <path
                  className="seed"
                  d="M314.4,358.4L314.4,358.4l-8-31.2l28,16l0,0c1.6,0.8,3.2,2.4,4.8,4c4.8,6.4,3.2,15.2-2.4,19.2
		c-6.4,4.8-15.2,3.2-19.2-2.4C315.2,362.4,314.4,360,314.4,358.4z"
                />

                <polygon
                  className="tail0"
                  points="235.2,66.4 208,75.2 185.6,33.6 201.6,22.4 210.4,29.6 206.4,5.6 243.2,0 245.6,19.2 252,13.6 
	252,66.4 "
                />
                <polygon
                  className="tail1"
                  points="268.8,66.4 296,75.2 318.4,33.6 302.4,22.4 293.6,29.6 297.6,5.6 260.8,0 258.4,19.2 252,13.6 
	252,66.4 "
                />
                <circle className="loader" cx="230" cy="253" r="165" />
              </svg>

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

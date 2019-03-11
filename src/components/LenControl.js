import React, { Component } from "react";

class LenControl extends Component {
  render() {
    return (
      <div className="time-control">
        <div id={this.props.ctrlName} className="len-label">
          {this.props.strName}
        </div>
        <div className="fccwontletme">
          <div id={this.props.ctrlLenId} className="time-text len-text">
            {this.props.ctrlLen}
          </div>
          <span> min</span>
        </div>
        <div className="incdec-wrapper">
          <button
            id={this.props.btnDec}
            value="-"
            onClick={this.props.incdecLen}
          >
            <i className="fas fa-minus" />
          </button>

          <button
            id={this.props.btnInc}
            value="+"
            onClick={this.props.incdecLen}
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
    );
  }
}

export default LenControl;

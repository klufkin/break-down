import React from 'react';

class About extends React.Component {
  constructor() {
    super();

    this.showInfo = this.showInfo.bind(this);

    // Set initial state
    this.state = {
      displayInfo: false,
    };
  }

  showInfo() {
    this.setState({ displayInfo: true });
  }

  hideInfo() {
    this.setState({ displayInfo: false });
  }

  render() {
    const renderAboutInfo = this.state.displayInfo
      ? (<div className="about-info">
        <a className="about-back" href="#home" onClick={() => this.hideInfo()}>
            Back
          </a>
        <p className="about-text">
            Break Down is a simple tool to break down todos and goals
            into actionable steps.
            It is built utilizing the React framework and uses local
            storage so that your steps
            will persist even after closing your browser. No need to
            download or save anything! It&apos;s time
            to break down!!<span className="about-dancer" role="img" aria-label="dancer">💃</span>
        </p>
        <a href="https://github.com/klufkin/break-down" target="_blank" rel="noreferrer noopener">
            Github
          </a>
        <a href="http://www.kevinlufkin.com" target="_blank" rel="noreferrer noopener">
            Kevin Lufkin
          </a>
      </div>)
      : (<a className="about-link" href="#about" onClick={() => this.showInfo()}>
          About
        </a>);

    return (
      <div className="about">
        {renderAboutInfo}
      </div>
    );
  }
}

export default About;

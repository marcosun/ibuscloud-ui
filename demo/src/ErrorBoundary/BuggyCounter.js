import React from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';

@hot(module)
class BuggyCounter extends React.PureComponent {
  state = {
    counter: 0,
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    if (this.state.counter === 5) {
      /* Simulate a JS error. */
      throw new Error('I crashed!');
    }
    return <Button onClick={this.handleClick}>{this.state.counter}</Button>;
  }
}

export default BuggyCounter;

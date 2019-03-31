/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Button } from 'semantic-ui-react';
import Yeelight from '../Yeelight/index';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      bulbs: [],
    };

    this.yeelight = new Yeelight();
    // this.handleClick = this.handleClick.bind(this);
    // this.toggleBulb = this.toggleBulb.bind(this);
  }

  // toggleBulb = () => this.yeelight.togglePower();

  handleClick = () => this.discoverBulbs();

  discoverBulbs() {
    console.log('Clicked');
    let newState = this.state;
    newState.refreshing = true;
    newState.bulbs = [];
    this.setState(newState);

    this.yeelight.discoverBulbs(bulbs => {
      if (bulbs !== null) {
        newState = this.state;
        newState.refreshing = false;
        newState.bulbs = bulbs;
        this.setState(newState);
      } else {
        newState = this.state;
        newState.refreshing = false;
        this.setState(newState);

        console.log('Unable to find any bulbs in local network');
      }
    });
  }

  render() {
    return (
      <div>
        <Button basic content="Connect" onClick={this.handleClick} />
        {/* <Button content="Toggle" onClick={this.toggleBulb()} /> */}
      </div>
    );
  }
}

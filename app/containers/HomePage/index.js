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
import { FormattedMessage } from 'react-intl';
import { Button } from 'semantic-ui-react';
import messages from './messages';
import Yeelight from '../Yeelight';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      bulbs: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.yeelight = new Yeelight();
  }

  handleClick = () => this.connect();

  connect() {
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
      <h1>
        <FormattedMessage {...messages.header} />
        <Button basic content="Connect" onClick={this.handleClick} />
      </h1>
    );
  }
}

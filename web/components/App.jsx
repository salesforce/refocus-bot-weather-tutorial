/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * /web/components/App.js
 *
 * Main component for UI build
 *
 */

import PropTypes from 'prop-types';
const React=require('react');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      temperature: this.props.temperature ? this.props.temperature : 'N/A',
      weather: this.props.weather ? this.props.weather : 'Cant determine weather',
      location: this.props.location ? this.props.location : 'Location not found',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      temperature: nextProps.temperature,
      weather: nextProps.weather,
      location: nextProps.location
    });
  }

  render(){
    return (
      <div className="slds-grid slds-p-around_small">
        <div className="slds-cols slds-has-flexi-truncate">
          <div className="slds-media slds-no-space slds-grow">
            <div className="slds-media__body">
              <h2 className="slds-text-heading_medium" id="weather">{this.state.weather}</h2>
              <p className="slds-text-body_small slds-line-height_reset" id="location">{this.state.location}</p>
            </div>
          </div>
        </div>
        <div className="slds-cols slds-has-flexi-truncate">
          <div className="slds-media slds-no-space slds-grow slds-float_right">
            <h1 className="slds-text-heading_large" id="temp">
              <span>{this.state.temperature}&#176;F</span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes={
  temperature: PropTypes.number,
  weather: PropTypes.string,
  location: PropTypes.string,
};

module.exports=App;

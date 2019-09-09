import React, { Component } from 'react'
import { Networker } from '../util/networker';
import { API_URLS } from '../constants/network';

export class ShowForm extends Component {

  componentDidMount() {
    Networker.get(API_URLS.SHOW_FORM)
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

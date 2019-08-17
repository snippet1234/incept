import React, { Component } from 'react'
import { Networker } from '../util/network';
import { API_URLS } from '../constants/network';
import { LeadForm } from '../util/types';
import { Table } from 'antd';

const columns = [
  {
    title: 'Sr. No',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
]

export class Subscriptions extends Component {
  state = {
    forms: []
  }

  async componentDidMount() {
    const { data } = await Networker.get<LeadForm[]>(API_URLS.LEAD_FORM);
    this.setState({ forms: data });
  }

  render() {
    const { forms } = this.state;
    return (
      <Table dataSource={forms} columns={columns} />
    )
  }
}

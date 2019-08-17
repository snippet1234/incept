import React, { Component } from 'react'
import { Networker } from '../util/network';
import { API_URLS } from '../constants/network';
import { LeadForm } from '../util/types';
import { Table, Breadcrumb, Button, Card } from 'antd';
import { Link } from 'react-router-dom';

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
  {
    title: 'Show',
    key: 'show',
    render: (item: any) => (<Link to={`/form/${item.id}`}><Button type="primary">View</Button></Link>)
  },
]

export class Forms extends Component {
  state = {
    forms: [],
    formVisible: false
  }

  async componentDidMount() {
    const { data } = await Networker.get<LeadForm[]>(API_URLS.LEAD_FORM);
    this.setState({ forms: data });
  }

  render() {
    const { forms } = this.state;
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Forms</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Table dataSource={forms} columns={columns} />

        </Card>
      </>
    )
  }
}

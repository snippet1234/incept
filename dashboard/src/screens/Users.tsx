import React, { Component } from 'react'
import { Networker } from '../util/networker';
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
]

export class Users extends Component {
  state = {
    users: [],
    formVisible: false
  }

  async componentDidMount() {
    const { data } = await Networker.get<LeadForm[]>(API_URLS.USERS);
    this.setState({ users: data });
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Table dataSource={users} columns={columns} />

        </Card>
      </>
    )
  }
}

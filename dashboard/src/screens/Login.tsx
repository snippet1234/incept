import React, { SyntheticEvent } from 'react';
import { Networker } from '../util/network';
import { API_URLS } from '../constants/network';
import { STORAGE_KEYS } from '../constants/storage';
import { getClientData, setAuthData, getAuthData } from '../util/storage';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router';

class LoginView extends React.Component<{ form: any }> {

  async componentDidMount() {
    const { data } = await Networker.get(API_URLS.CLIENT);
    localStorage.setItem(STORAGE_KEYS.CLIENT, JSON.stringify(data));
  }

  handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: Error, values: any) => {
      if (!err) {
        const client = getClientData();
        console.warn(client);
        const { data } = await Networker.post(API_URLS.LOGIN, {
          ...values,
          grant_type: 'password',
          client_id: client.client_id,
          client_secret: client.secret,

        });
        setAuthData(data);

        console.log('Received values of form: ', data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const authData = getAuthData();
    return (
      <div style={{ width: 400, position: 'absolute', marginLeft: '50%', left: -200, top: 250, boxShadow: '0px 0px 25px grey', borderRadius: 5, padding: '45px' }}>
        {authData && <Redirect to="/" />}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="/forgot-password">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

export const Login = Form.create()(LoginView);
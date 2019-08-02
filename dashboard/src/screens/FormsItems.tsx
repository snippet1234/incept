import React, { Component } from 'react'
import { Networker } from '../util/network';
import { API_URLS } from '../constants/network';
import { LeadForm, LeadFormItem } from '../util/types';
import { Table, Breadcrumb, Card, Modal, Button, message, Popconfirm, } from 'antd';
import { WithRouterProps, withRouter, RouteProps, RouterProps, RouteComponentProps } from 'react-router';
import { findIndex } from 'lodash';
import { ItemForm } from './ItemForm';
import { Link } from 'react-router-dom';

type ColumnProps = {
  onEdit: (item: LeadFormItem) => void;
  onDelete: (item: LeadFormItem) => void;
}
const columns = (props: ColumnProps) => [
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
    title: 'Placeholder',
    dataIndex: 'placeholder',
    key: 'placeholder',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'type',
    dataIndex: 'type.name',
    key: 'type',
  },
  {
    title: 'options',

    key: 'options',
    render: (_item: LeadFormItem) => (<b>{_item.options ? _item.options.length : 'NA'} </b>)
  },
  {
    title: 'actions',
    key: 'actions',
    render: (_item: LeadFormItem) => (<>
      <Button  style={{marginRight: 20}} type="dashed" onClick={() => props.onEdit(_item)}>edit</Button>
      <Popconfirm
        style={{ marginLeft: 40 }}
        title="Are you sure delete this task?"
        onConfirm={() => props.onDelete(_item)}
        okText="Yes"
        cancelText="No"
      >
        <a href="#">Delete</a>
      </Popconfirm></>)
  }
]

interface FormItemViewProps {
  items: LeadFormItem[];
}

interface FormItemViewState {
  selectedItem?: LeadFormItem;
  items: LeadFormItem[];
  confirmLoading: boolean;
  formVisible: boolean;
}
class FormItemsView extends Component<FormItemViewProps & RouteComponentProps<{ formid: string, name: string }>, FormItemViewState> {
  state: FormItemViewState = {
    items: [],
    formVisible: false,
    confirmLoading: false
  }

  formRef: any;

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { data } = await Networker.get(`${API_URLS.LEAD_FORM}/${params.formid}/formitem`)
    console.log(data);
    this.setState({ items: data })
  }

  handleEdit = async (item: LeadFormItem) => {
    this.setState({
      selectedItem: item,
      formVisible: true,
    })
  }

  handleDelete = async (item: LeadFormItem) => {
    const { items } = this.state;

    const { match: { params } } = this.props;
    const { data } = await Networker.delete(`${API_URLS.LEAD_FORM}/${params.formid}/formitem/${item.id}`)
    items.splice(items.indexOf(item), 1);
    this.setState({ items });

    message.success('Form item deleted');
  }

  onSubmit = async () => {
    const { form } = this.formRef.props;
    const { match: { params } } = this.props;
    const { selectedItem, items } = this.state;
    form.validateFields(async (err: Error, values: any) => {
      if (err) {
        return;
      }
      if (selectedItem && selectedItem.id) {

        const { data } = await Networker.put(`${API_URLS.LEAD_FORM}/${params.formid}/formitem/${selectedItem.id}`, values);

        message.success('Updated form item');
        console.warn(data);
        return;
      }


      const { data } = await Networker.post(`${API_URLS.LEAD_FORM}/${params.formid}/formitem`, values);

      items.unshift(data);
      this.setState({ items });
      message.success('Created form item');


      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ formVisible: false });
    });
  }

  render() {
    const { items, formVisible, selectedItem, confirmLoading } = this.state;
    const { match: { params } } = this.props;

    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Link to="/"><Breadcrumb.Item>Forms</Breadcrumb.Item></Link>
          <Breadcrumb.Item>{params.formid}</Breadcrumb.Item>
        </Breadcrumb>
        <Card>

          <Button style={{ marginLeft: '77%', marginBottom: 10 }} size="large" type="primary" onClick={() => this.setState({ selectedItem: undefined, formVisible: true })}>Create</Button>
          <Table dataSource={items} columns={columns({ onEdit: this.handleEdit, onDelete: this.handleDelete })} />
        </Card>
        <Modal
          confirmLoading={confirmLoading}
          okText={selectedItem ? 'Update' : 'Create'}
          visible={formVisible}
          onCancel={() => this.setState({ formVisible: false, selectedItem: undefined })}
          onOk={this.onSubmit}>
          <ItemForm selected={selectedItem} wrappedComponentRef={this.saveFormRef} />
        </Modal>
      </>
    )
  }
}

export const FormItems = withRouter(FormItemsView);
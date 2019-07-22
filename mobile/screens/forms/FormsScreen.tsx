import React, { Component } from 'react';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import {
  List,
  ListItem,
  Button,
  ButtonProps,
  StyleType,
  Text,
  Layout
} from 'react-native-ui-kitten';
import { ListRenderItemInfo, View } from 'react-native';
import { Networker } from '../../util/networker';
import { API_URLS } from '../../constants/network';

interface FormsScreenViewState extends NavigationScreenProps {
  forms: LeadForm[]
}

class FormsScreenView extends Component<FormsScreenViewState> {
  state = {
    forms: []
  }
  async componentDidMount() {
    const { data } = await Networker.get(API_URLS.FORM);
    this.setState({ forms: data })
    console.warn(data);
  }

  private onItemPress = (index: number) => {
    // Handle item press
    this.props.navigation.navigate('UpdateForm', { form: this.state.forms[index] });
  };

  private renderItem = (
    info: ListRenderItemInfo<LeadForm>
  ): React.ReactElement => {
    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          <Button
            size="small"
            appearance="ghost"
            status="warning"
            style={style}
            onPress={() => this.onItemPress(0)}
          >
            UPDATE
          </Button>
          <Button size="small" appearance="ghost" status="danger" style={style}>
            X
          </Button>
        </>
      );
    };

    return (
      <ListItem
        title={`${info.item.name}`}
        description={`${info.item.items.length} fields | ${info.item.status}`}
        onPress={this.onItemPress}
        accessory={Accessory}
        titleStyle={{ fontSize: 17 }}
        descriptionStyle={{ marginTop: 7 }}
        style={{
          paddingVertical: 10,
          borderBottomColor: '#aaf',
          borderBottomWidth: 0.3
        }}
      />
    );
  };

  render() {
    const { forms } = this.state;
    return (
      <Layout style={{ padding: 20, marginTop: 25, flex: 1 }}>
        <List
          style={{ backgroundColor: 'white' }}
          data={forms}
          renderItem={this.renderItem}
        />
      </Layout>
    );
  }
}

export const FormsScreen = withNavigation(FormsScreenView);

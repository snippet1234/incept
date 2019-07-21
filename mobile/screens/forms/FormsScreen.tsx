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
import { Message } from '../../util/message';

class FormsScreenView extends Component<NavigationScreenProps> {
  async componentDidMount() {
    const { data } = await Networker.get(API_URLS.FORM);
    console.warn(data);
  }

  private data: { name: string }[] = [
    { name: 'Campaign Form' },
    { name: 'Campaign Form' },
    { name: 'Campaign Form' },
    { name: 'Campaign Form' },
    { name: 'Campaign Form' },
    { name: 'Campaign Form' },
    { name: 'Campaign Form' }
  ];

  private onItemPress = (index: number) => {
    // Handle item press
    this.props.navigation.navigate('UpdateForm');
  };

  private renderItem = (
    info: ListRenderItemInfo<{ name: string }>
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
        title={info.item.name}
        description="11 fields | Live"
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
    return (
      <Layout style={{ padding: 20, marginTop: 25, flex: 1 }}>
        <List
          style={{ backgroundColor: 'white' }}
          data={this.data}
          renderItem={this.renderItem}
        />
      </Layout>
    );
  }
}

export const FormsScreen = withNavigation(FormsScreenView);

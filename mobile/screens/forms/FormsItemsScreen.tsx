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
import { PALLETE } from '../../constants/Colors';

class FormsItemsScreenView extends Component<NavigationScreenProps> {
  private data: { name: string; type: string }[] = [
    { type: 'Text Input', name: 'Form Field' },
    { type: 'Select Input', name: 'Form Field' },
    { type: 'Radio Input', name: 'Form Field' },
    { type: 'Select Input', name: 'Form Field' },
    { type: 'Text Input', name: 'Form Field' },
    { type: 'Select Input', name: 'Form Field' },
    { type: 'Radio Input', name: 'Form Field' }
  ];
  private onItemPress = (index: number) => {
    // Handle item press
  };

  private renderItem = (
    info: ListRenderItemInfo<{ name: string; type: string }>
  ): React.ReactElement => {
    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          <Button
            size="small"
            appearance="ghost"
            status="warning"
            style={style}
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
        description={info.item.type}
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
        <Text category="h3" style={{ marginBottom: 15 }}>
          Update Form
        </Text>
        <List
          style={{ backgroundColor: 'white' }}
          data={this.data}
          renderItem={this.renderItem}
        />
        <Button
          onPress={() => console.warn}
          style={{
            width: '100%',
            marginTop: 15,
            marginBottom: 170,
            borderColor: 'transparent',
            backgroundColor: PALLETE.primary
          }}
        >
          UPDATE
        </Button>
      </Layout>
    );
  }
}

export const FormItemsScreen = withNavigation(FormsItemsScreenView);

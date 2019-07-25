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
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { PALETTE } from '../../constants/colors';

interface ShowFormsScreenViewState extends NavigationScreenProps {
  form: LeadForm
}

class ShowFormScreenView extends Component<ShowFormsScreenViewState> {
  state = {
    form: this.props.navigation.state.params.form
  }
  async componentDidMount() {
    console.warn(this.state.form)
  }

  private onItemPress = (index: number) => {
    // Handle item press
    this.props.navigation.navigate('UpdateFormItem', { formItem: this.state.form.items[index] });
  };

  renderShowItem = (info: ListRenderItemInfo<{ name: string; type: { name: string } }>) => {

    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          <Text status="success">{info.item.type.name}</Text>
          <Button size="small" appearance="ghost" status="danger" style={style}>
            X
          </Button>
        </>
      );
    };

    return (
      <ListItem
        title={info.item.name}
        description={info.item.type.name}

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
  }

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
    const { form } = this.state;
    return (
      <Layout style={{ padding: 20, marginTop: 25, flex: 1 }}>
        <Container>
          {/* <Header style={{ backgroundColor: PALETTE.white }} hasTabs /> */}
          <Tabs tabContainerStyle={{ backgroundColor: PALETTE.white }} tabBarBackgroundColor={PALETTE.white} style={{ backgroundColor: PALETTE.white }} tabBarUnderlineStyle={{ backgroundColor: PALETTE.primary }}>
            <Tab tabStyle={{ backgroundColor: PALETTE.white }}
              activeTextStyle={{ color: PALETTE.primary }}
              activeTabStyle={{
                backgroundColor: PALETTE.white, borderBottomColor: PALETTE.primary, borderColor: PALETTE
                  .primary
              }} heading="View Form">
              <List
                style={{ backgroundColor: 'white' }}
                data={form.items}
                renderItem={this.renderShowItem}
              />
            </Tab>
            <Tab heading="Edit Form" tabStyle={{ backgroundColor: PALETTE.white }}
              activeTextStyle={{ color: PALETTE.primary }}
              activeTabStyle={{
                backgroundColor: PALETTE.white, borderBottomColor: PALETTE.primary, borderColor: PALETTE
                  .primary
              }}>
              <List
                style={{ backgroundColor: 'white' }}
                data={form.items}
                renderItem={this.renderItem}
              />
            </Tab>
          </Tabs>
        </Container>
      </Layout>
    );
  }
}

export const ShowFormScreen = withNavigation(ShowFormScreenView);

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
import { ListRenderItemInfo, View, Dimensions } from 'react-native';
import { Networker } from '../../util/networker';
import { API_URLS } from '../../constants/network';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { PALETTE } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

interface ShowFormsScreenViewState extends NavigationScreenProps {
  form: LeadForm
}

const perPage = 5;

class ShowFormScreenView extends Component<ShowFormsScreenViewState> {
  state = {
    form: this.props.navigation.state.params.form,
    currentPage: 0,
    totalPages: Math.ceil(this.props.navigation.state.params.form.items.length / perPage)

  }
  async componentDidMount() {
    console.warn(this.state.form)
  }

  private onItemPress = (index: number) => {
    // Handle item press
    this.props.navigation.navigate('UpdateFormItem', { formItem: this.state.form.items[index] });
  };

  renderShowItem = (info: ListRenderItemInfo<LeadFormItem>) => {

    const Accessory = (style: StyleType): React.ReactElement<ButtonProps> => {
      return (
        <>
          {info.item.options.length > 0 && <Text category="C2" status="info">Options {info.item.options.length.toString()}</Text>}

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

  private renderUpdateItem = (
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

  renderPaginatedFormItems = () => {
    const { form, currentPage, totalPages } = this.state;

    let data = []
    console.warn(form.items.length, 'data', totalPages);
    for (let i = 0; i < totalPages; i++) {

      data[i] = form.items.slice(perPage * i, perPage * i + perPage);
    }
    return data.map((d, index) => {
      // console.warn(d.length, index)
      return (
        <List
          style={{ backgroundColor: 'white', width: Dimensions.get('window').width }}
          data={d}
          renderItem={this.renderShowItem}
        />
      )
    })

  }

  render() {

    const { form, currentPage, totalPages } = this.state;

    return (
      <Layout style={{ flex: 1 }}>
        <Container>
          {/* <Header style={{ backgroundColor: PALETTE.white }} hasTabs /> */}
          <Tabs locked tabContainerStyle={{ backgroundColor: PALETTE.white }} tabBarBackgroundColor={PALETTE.white} style={{ backgroundColor: PALETTE.white }} tabBarUnderlineStyle={{ backgroundColor: PALETTE.primary }}>
            <Tab tabStyle={{ backgroundColor: PALETTE.white }}
              activeTextStyle={{ color: PALETTE.primary }}
              activeTabStyle={{
                backgroundColor: PALETTE.white, borderBottomColor: PALETTE.primary, borderColor: PALETTE
                  .primary
              }} heading="View Form">
              <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator>
                {this.renderPaginatedFormItems()}

              </ScrollView>
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
                renderItem={this.renderUpdateItem}
              />
            </Tab>
          </Tabs>

          <Button
            onPress={() => {
              this.props.navigation.navigate('products');
            }}
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              marginTop: 50
            }}
          >
            CONTINUE TO PLAN
          </Button>
        </Container>
      </Layout>
    );
  }
}

export const ShowFormScreen = withNavigation(ShowFormScreenView);

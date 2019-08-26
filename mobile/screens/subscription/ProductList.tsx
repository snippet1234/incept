import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Avatar, Layout, ListProps, Text } from '@kitten/ui';
import { Card, Title } from 'native-base';
import React from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
  TouchableHighlight,
  View
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { API_URLS } from '../../constants/network';
import { Product } from '../../core/model';
import { Message } from '../../util/message';
import { Networker } from '../../util/networker';
import { ProductListItem, ProductListItemProps } from './ProductListItem';
import { extractErrorMessage } from '../../util/error';
import { ScrollView } from 'react-native-gesture-handler';

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  onItemAddPress: (index: number) => void;
  onItemPress: (index: number) => void;
  renderItem?: (info: ListRenderItemInfo<Product>) => ListItemElement;
}

export type ProductListProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ProductListItemProps>;

type ProductListState = {
  plans: Plan[];
  loading: boolean;
};

class ProductListComponent extends React.Component<
  ProductListProps & NavigationScreenProps,
  ProductListState
> {
  state: ProductListState = {
    plans: [],
    loading: false
  };
  public async componentDidMount() {
    let plans = [];
    this.setState({ loading: true });
    try {
      const { data } = await Networker.get(API_URLS.PLANS);
      plans = data;
    } catch (err) {
      console.warn(err.repsonse);
      Message.show(extractErrorMessage(err), 'danger');
    } finally {
      this.setState({
        plans,
        loading: false
      });
    }
  }

  public render(): React.ReactNode {
    const {
      contentContainerStyle,
      themedStyle,
      data,
      ...restProps
    } = this.props;
    const { plans } = this.state;
    const premiumImage =
      'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg';
    return (
      <Layout style={{ padding: 15 }}>
        <SafeAreaView>
          <ScrollView>
            {plans.map(plan => (
              <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('cart', { plan: plan.id });
                }}
              >
                <Card style={{ padding: 20, borderRadius: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Avatar
                      style={{ width: 90, height: 90 }}
                      source={{ uri: premiumImage }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Title
                        style={{
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          marginTop: 20
                        }}
                      >
                        {plan.name}
                      </Title>
                      <Text style={{ marginLeft: 5 }}>{plan.description}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Layout>
    );
  }
}

export const ProductList = withStyles(
  ProductListComponent,
  (theme: ThemeType) => ({
    container: {},
    item: {
      flex: 1,
      marginHorizontal: 8,
      marginVertical: 8,
      backgroundColor: theme['background-basic-color-1']
    }
  })
);

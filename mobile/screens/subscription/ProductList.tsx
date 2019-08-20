import React from 'react';
import { ListRenderItemInfo, SafeAreaView, View, TouchableHighlight } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { List, ListProps, Layout, Button, Text, Avatar } from '@kitten/ui';
import { Product } from '../../core/model';
import { ProductListItem, ProductListItemProps } from './ProductListItem';

import { PALETTE } from '../../constants/colors';
import { Title, Card } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  onItemAddPress: (index: number) => void;
  onItemPress: (index: number) => void;
  renderItem?: (info: ListRenderItemInfo<Product>) => ListItemElement;
}

export type ProductListProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ProductListItemProps>;

class ProductListComponent extends React.Component<ProductListProps & NavigationScreenProps> {
  private onProductAddPress = (index: number) => {
    this.props.onItemAddPress(index);
  };

  private onProductPress = (index: number) => {
    this.props.onItemPress(index);
  };

  private renderListItemElement = (item: Product): ListItemElement => {
    const { themedStyle } = this.props;

    return (
      <ProductListItem
        style={themedStyle.item}
        activeOpacity={0.75}
        image={item.photo.imageSource}
        name={item.name}
        type={item.type}
        price={`${item.cost} ${item.currency}`}
        onAddPress={this.onProductAddPress}
        onPress={this.onProductPress}
      />
    );
  };

  private renderItem = (info: ListRenderItemInfo<Product>): ListItemElement => {
    const { item, index } = info;

    const listItemElement: ListItemElement = this.renderListItemElement(item);

    return React.cloneElement(listItemElement, { index });
  };

  public render(): React.ReactNode {
    const {
      contentContainerStyle,
      themedStyle,
      data,
      ...restProps
    } = this.props;
    const products: Product[] = [
      {
        name: 'Yearly Premium Subscription',
        photo: {
          imageSource: {
            uri:
              'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg'
          }
        },
        cost: 799,
        currency: '$',
        description: '',
        type: 'Subscription',
        size: '',
        colors: ['red']
      },
      {
        name: 'Monthly Premium Subscription',
        photo: {
          imageSource: {
            uri:
              'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg'
          }
        },
        cost: 101,
        currency: '$',
        description: '',
        type: 'Subscription',
        size: '',
        colors: ['red']
      },
      {
        name: 'Quarterly Premium Subscription',
        photo: {
          imageSource: {
            uri:
              'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg'
          }
        },
        cost: 251,
        currency: '$',
        description: '',
        type: 'Subscription',
        size: '',
        colors: ['red']
      },
      {
        name: 'Quarterly Premium Subscription',
        photo: {
          imageSource: {
            uri:
              'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg'
          }
        },
        cost: 251,
        currency: '$',
        description: '',
        type: 'Subscription',
        size: '',
        colors: ['red']
      }
    ];
    const premiumImage =
      'http://www.fastandyou.com/uploads/2/3/6/2/23620028/s782333958681989678_p5_i1_w400.jpeg';
    return (
      <Layout style={{ padding: 15 }}>
        <SafeAreaView>
          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('cart')
          }}>
            <Card style={{ padding: 20, borderRadius: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar

                  style={{ width: 90, height: 90 }}
                  source={{ uri: premiumImage }}
                />
                <View style={{ paddingLeft: 10 }}>
                  <Title style={{ textAlign: 'left', justifyContent: 'flex-start', marginTop: 20 }}>1003 Forms</Title>
                  <Text style={{ marginLeft: 5 }}>Has only forms included</Text>
                </View>

              </View>
            </Card>

          </TouchableHighlight>

          <TouchableHighlight onPress={() => {
            this.props.navigation.navigate('cart', {
              website: true,
            })
          }}>
            <Card style={{ padding: 20, borderRadius: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Avatar

                  style={{ width: 90, height: 90 }}
                  source={{ uri: premiumImage }}
                />
                <View style={{ paddingLeft: 10 }}>
                  <Title style={{ textAlign: 'left', justifyContent: 'flex-start', marginTop: 20 }}>1003 Forms + Website</Title>
                  <Text style={{ marginLeft: 5 }}>Has forms along with Website</Text>
                </View>

              </View>
            </Card>
          </TouchableHighlight>
          {/* <Button
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary
            }}
            appearance="faded"
            status="warning"
          >
            Buy Subscription
          </Button> */}
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

import React from 'react';
import { ListRenderItemInfo, SafeAreaView } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { List, ListProps, Layout, Button, Text } from '@kitten/ui';
import { Product } from '../../core/model';
import { ProductListItem, ProductListItemProps } from './ProductListItem';
import { PALETTE } from '../../constants/Colors';

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  onItemAddPress: (index: number) => void;
  onItemPress: (index: number) => void;
  renderItem?: (info: ListRenderItemInfo<Product>) => ListItemElement;
}

export type ProductListProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ProductListItemProps>;

class ProductListComponent extends React.Component<ProductListProps> {
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

    return (
      <Layout style={{ padding: 15 }}>
        <SafeAreaView>
          <List
            {...restProps}
            contentContainerStyle={[
              contentContainerStyle,
              themedStyle.container,
              { backgroundColor: '#fff' }
            ]}
            data={products}
            renderItem={this.renderItem}
            numColumns={2}
          />
          <Button
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary
            }}
            appearance="faded"
            status="warning"
          >
            Buy Subscription
          </Button>
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

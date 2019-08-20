import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { AddPaymentCardForm } from '../addPaymentCardForm.component';
import { Layout, Text, Button } from '@kitten/ui';
import { PALETTE } from '../../constants/colors';
import { PaymentCard } from './PaymentCard';
import { Card } from 'native-base';
class CartScreenView extends Component<NavigationScreenProps> {
  render() {
    const { params } = this.props.navigation.state;
    console.warn(params);
    return (
      <SafeAreaView>
        <Layout style={{ padding: 15, marginBottom: 15 }}>

          <AddPaymentCardForm
            onFormValueChange={() => {
              return;
            }}
          />



          <Button
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              marginTop: 20
            }}
          >
            CONTINUE TO PAYMENT
          </Button>
          {params && params.website && <Card style={{
            backgroundColor: '#FFDF00',
            margin: 25,
          }}><Text style={{
            padding: 15,
            color: PALETTE.white,
            borderRadius: 100
          }}>
              Includes website
          </Text></Card>}
        </Layout>
      </SafeAreaView>
    );
  }
}

export const CartScreen = withNavigation(CartScreenView);

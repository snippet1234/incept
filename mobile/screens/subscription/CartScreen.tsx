import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { AddPaymentCardForm } from '../addPaymentCardForm.component';
import { Layout, Text, Button } from '@kitten/ui';
import { PALETTE } from '../../constants/Colors';
import { PaymentCard } from './PaymentCard';
class CartScreenView extends Component<NavigationScreenProps> {
  render() {
    const { params } = this.props.navigation.state;
    console.warn(params);
    return (
      <SafeAreaView>
        <Layout style={{ padding: 15, marginBottom: 15 }}>
          <Text appearance="default" category="h2" style={{ marginBottom: 15 }}>
            Choose Forms
          </Text>
          <AddPaymentCardForm
            onFormValueChange={() => {
              return;
            }}
          />

          {params && params.website && <Text style={{
            backgroundColor: PALETTE.warningBackground,
            padding: 15,
            color: PALETTE.white,

            borderRadius: 100
          }}>
            Includes website
          </Text>}

          <Button
            style={{
              backgroundColor: PALETTE.primary,
              borderColor: PALETTE.primary,
              marginTop: 20
            }}
          >
            CONTINUE TO PAYMENT
          </Button>
        </Layout>

      </SafeAreaView>
    );
  }
}

export const CartScreen = withNavigation(CartScreenView);

import React, { Component } from 'react'
import { SafeAreaView, ScrollView } from 'react-native';
import { Layout, Text } from '@kitten/ui'
import { PaymentCard } from './PaymentCard';

export class Cards extends Component {
  render() {
    return (
      <SafeAreaView>

        <Layout style={{ padding: 15 }}>

          <PaymentCard onDetails={() => { return; }} paymentCard={{ type: 'visa', cardHolder: 'Akash Rajput', expireDate: '10/20', cvv: '234', number: '2434 5678 0976 1050' }} />
          <PaymentCard onDetails={() => { return; }} paymentCard={{ type: 'visa', cardHolder: 'Akash Rajput', expireDate: '10/20', cvv: '234', number: '2434 5678 0976 1050' }} />
          <PaymentCard onDetails={() => { return; }} paymentCard={{ type: 'visa', cardHolder: 'Akash Rajput', expireDate: '10/20', cvv: '234', number: '2434 5678 0976 1050' }} />

        </Layout>
      </SafeAreaView>

    )
  }
}

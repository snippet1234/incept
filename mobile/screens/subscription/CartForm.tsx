import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Avatar, Button } from 'react-native-ui-kitten';
import { CustomInput } from '../../components/CustomInput';
import { Message } from '../../util/message';
import { textStyle, ValidationInput } from '../../components/common';
import { PALETTE } from '../../constants/colors';

export interface CartFormDataType {
  form_count: number;
  renewal_term: number;
  total: number;
  currency: string;
}

interface ComponentProps {
  onFormSubmitted: (value: CartFormDataType) => void;
}

export type CartFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  price: number;
  total: number;
  discount: number;
  renewal_term: number;
  form_count: number;
}

class CartFormView extends React.Component<CartFormProps, State> {
  public state: State = {
    price: 1.5,
    total: 0,
    discount: 0,
    renewal_term: 1,
    form_count: 1
  };

  private onFormSubmitted = () => {
    const { total, form_count, renewal_term } = this.state;
    this.props.onFormSubmitted({
      total,
      renewal_term,
      form_count,
      currency: 'INR'
    });
    // this.setState({ total: Number(cardNumber) * this.state.price });
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;
    const { total } = this.state;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label="NO. OF 1003 FORMS"
          placeholder="Enter a number"
          validator={() => true}
          // formatter={CardNumberFormatter}
          maxLength={19}
          keyboardType="numeric"
          onChangeText={val => {
            const total =
              this.state.renewal_term * Number(val) - this.state.discount;

            this.setState({
              form_count: Number(val),
              total
            });
          }}
        />

        <CustomInput
          placeholder="Coupon Code"
          label="Coupon Code"
          autoCapitalize="characters"
          value={undefined}
          // icon={() => (
          //   <Avatar
          //     shape="round"
          //     size="small"
          //     source={require('../assets/icons/eva/checkmark-outline.png')}
          //   />
          // )}
          onChangeText={value => {
            if (value === 'INCEPT') {
              Message.show("Coupon Applied You're saving upto $50", 'success');
              const total =
                this.state.renewal_term * this.state.form_count - 50;

              this.setState({
                discount: 50,
                total
              });
            } else {
              this.setState({
                discount: 0
              });
            }
          }}
        />

        <Dropdown
          label="SUBSCRIPTION TERM"
          value={'Monthly'}
          data={['Monthly', 'Quartly', 'Six Months', 'Yearly'].map(status => ({
            value: status
          }))}
          onChangeText={(value, index, data) => {
            this.setState({ renewal_term: index + 1 + 3 });
          }}
        />

        <Text style={{ textAlign: 'left', fontSize: 27, marginVertical: 20 }}>
          Total: ${total}
        </Text>
        <Button
          onPress={this.onFormSubmitted}
          style={{
            backgroundColor: PALETTE.primary,
            borderColor: PALETTE.primary,
            marginTop: 20
          }}
        >
          CONTINUE TO PAYMENT
        </Button>
      </View>
    );
  }
}

export const CartForm = withStyles(CartFormView, (theme: ThemeType) => ({
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24
  },
  input: {
    backgroundColor: theme['background-basic-color-1']
  },
  expireInput: {
    width: 90
  },
  cvvInput: {
    marginLeft: 24,
    width: 64
  },
  cardholderNameInput: {
    marginTop: 24
  }
}));

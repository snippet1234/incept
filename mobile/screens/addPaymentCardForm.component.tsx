import React from 'react';
import {
  View,
  ViewProps,
  Text,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  textStyle,
  ValidationInput,
} from '../components/common';
import {
  CardNumberValidator,
  ExpirationDateValidator,
  CvvValidator,
  CardholderNameValidator,
} from '../core/validators';
import {
  CardNumberFormatter,
  ExpirationDateFormatter,
  CvvFormatter,
  CardholderNameFormatter,
} from '../core/formatters';
import { Title } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import { Avatar, Button } from 'react-native-ui-kitten';
import { CustomInput } from '../components/CustomInput';
import { Message, MessageDuration } from '../util/message';


export interface AddPaymentCardFormType {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
}

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onFormValueChange: (value: AddPaymentCardFormType | undefined) => void;
}

export type AddPaymentCardFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  cardNumber: string | undefined;
  expirationDate: string | undefined;
  cvv: string | undefined;
  cardholderName: string | undefined;
  price: number;
  total: number;
  discount: number;
  selectedPeriod: number;
}

class AddNewCardComponent extends React.Component<AddPaymentCardFormProps, State> {

  public state: State = {
    cardNumber: undefined,
    expirationDate: undefined,
    cvv: undefined,
    cardholderName: undefined,
    price: 1.5,
    total: 0,
    discount: 0,
    selectedPeriod: 1,
  };

  public componentDidUpdate(prevProps: AddPaymentCardFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;

    if (becomeValid) {
      this.props.onFormValueChange(this.state);
    } else if (becomeInvalid) {
      this.props.onFormValueChange(undefined);
    }
  }

  private onCardNumberChange = (cardNumber: string) => {

    this.setState({ cardNumber, total: Number(cardNumber) * this.state.price });
  };

  private onExpirationDateChange = (expirationDate: string) => {
    this.setState({ expirationDate });
  };

  private onCvvChange = (cvv: string) => {
    this.setState({ cvv });
  };

  private onCardHolderNameChange = (cardholderName: string) => {
    this.setState({ cardholderName });
  };

  private isValid = (value: AddPaymentCardFormType): boolean => {
    const { cardNumber, expirationDate, cvv, cardholderName } = value;

    return cardNumber !== undefined
      && expirationDate !== undefined
      && cvv !== undefined
      && cardholderName !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    const total = (this.state.total - this.state.discount) > 0 ? (this.state.total * this.state.selectedPeriod - this.state.discount) : 0;
    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label='NO. OF 1003 FORMS'
          placeholder='Enter a number'
          validator={() => true}
          // formatter={CardNumberFormatter}
          maxLength={19}
          keyboardType='numeric'
          onChangeText={this.onCardNumberChange}
        />
        {/* <View style={themedStyle.middleContainer}>
          <ValidationInput
            style={[themedStyle.input, themedStyle.expireInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='EXPIRE DATE'
            placeholder='MM/YY'
            validator={ExpirationDateValidator}
            formatter={ExpirationDateFormatter}
            maxLength={5}
            keyboardType='numeric'
            onChangeText={this.onExpirationDateChange}
          />
          <ValidationInput
            style={[themedStyle.input, themedStyle.cvvInput]}
            textStyle={textStyle.paragraph}
            labelStyle={textStyle.label}
            label='CVV'
            placeholder='CVV'
            validator={CvvValidator}
            formatter={CvvFormatter}
            maxLength={3}
            keyboardType='numeric'
            onChangeText={this.onCvvChange}
          />
        </View> */}
        <CustomInput
          placeholder="Coupon Code"
          label="Coupon Code"
          autoCapitalize="characters"
          value={undefined}
          icon={() => (
            <Avatar
              shape="round"
              size="small"
              source={require('../assets/icons/eva/checkmark-outline.png')}
            />
          )}
          onChangeText={value => {
            if (value === 'INCEPT') {
              Message.show('Coupon Applied You\'re saving upto $50', 'success');
              this.setState({
                discount: 50
              })
            } else {
              this.setState({
                discount: 0
              })

            }
          }}
        />
        {/* <Button style={{ width: '50%', marginLeft: '40%' }} size="small">Apply Coupon</Button> */}

        <Dropdown
          label='SUBSCRIPTION TERM'
          value={'Monthly'}
          data={['Monthly', 'Quartly', 'Six Months', 'Yearly',].map(status => ({ value: status }))}
          onChangeText={(value, index, data) => {

            this.setState({ selectedPeriod: (index + 1) + 3 })
          }}
        />

        <Text style={{ textAlign: 'left', fontSize: 27, marginVertical: 20 }}>Total: ${total}</Text>

      </View>
    );
  }
}

export const AddPaymentCardForm = withStyles(AddNewCardComponent, (theme: ThemeType) => ({
  container: {
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  input: {
    backgroundColor: theme['background-basic-color-1'],
  },
  expireInput: {
    width: 90,
  },
  cvvInput: {
    marginLeft: 24,
    width: 64,
  },
  cardholderNameInput: {
    marginTop: 24,
  },
}));

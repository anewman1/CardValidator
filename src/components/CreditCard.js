import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class CreditCard extends Component {

    constructor() {
        super();
        this.state = {
            cardType: '',
            cardValid: ''
        };
    }

    renderUserField(field) {
        return (
            <div>
                <label>Please validate your Credit Card number : </label>
                <input
                    type="number"
                    placeholder="Credit card number"
                    {...field.input}

                    onChange={event => {
                        field.input.onChange(event.target.value);
                    }}
                />
            </div>
        )
    }

    onSubmit(event) {
        // Check that the form has a value
        if(typeof event.cardNumber !== 'undefined'){
            // If the length is 16 make sure the user can't enter any other values
            if(event.cardNumber.length > 16) {
                event.cardNumber = event.cardNumber.slice(0,16)
            }

            // Switch statement to check what sort of card the user has based on provided information
            switch(true){
                case event.cardNumber.charAt(0) === '4':
                    this.setState({cardType: 'Visa'});
                    if(event.cardNumber.length === 13 || event.cardNumber.length === 16){
                        this.valid_credit_card(event.cardNumber);
                    }
                    break;
                case event.cardNumber.substring(0,2) > '50' && event.cardNumber.substring(0,2) < '56':
                    this.setState({cardType: 'MasterCard'});
                    if(event.cardNumber.length === 16){
                        this.valid_credit_card(event.cardNumber);
                    }
                    break;
                case event.cardNumber.substring(0,2) === '34' || event.cardNumber.substring(0,2) === '37':
                    this.setState({cardType: 'AMEX'});
                    if(event.cardNumber.length === 15){
                        this.valid_credit_card(event.cardNumber);
                    }
                    break;
                case event.cardNumber.substring(0,4) === '6011' :
                    this.setState({cardType: 'Discover'});
                    if(event.cardNumber.length === 16){
                        this.valid_credit_card(event.cardNumber);
                    }
                    break;
                default:
                    this.setState({cardType: ''});
                    break;
            }
        } else {
            this.setState({cardType: '', cardValid: ''});
        }


    }

    // Function not written by myself but will comment each line to show I know what is going on, I wrote the switch
    valid_credit_card(value) {
    console.log('value?', value);
    // accept only digits, dashes or spaces, this could be left out since I'm using type=number but have left it in
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm.
    /*
        nCheck is the global variable to add up for the step 3 to see if it's a multiple of 10, nDigit is the
        number that will be multiplied and bEven is just to run the multiplication over every other digit. This doesn't
        necessarily mean it's odd/even. Set to false so it only adds the first digit
    */
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {

        // Get the character at n place (eg 3 if the number was 4408 0412 3456 7893 like in the example pdf)
        var cDigit = value.charAt(n);

        // Sanitise
        nDigit = parseInt(cDigit, 10);

        /*
            This is where I was going about the task differently but found this to be more concise. Instead of having to
            go through and split numbers higher than 10 and add the numbers together (eg 7 would become 14, then in step
            two you would do 1+4) simply subtract by 9 if it's double digits :)

        */
        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        // Add the number to the overall value to be checked later and switch the bEven back to true/false
        nCheck += nDigit;
        bEven = !bEven;
    }

    // Check if if is divisible by 10 with no remainder, if true set the cardValidity to true, otherwise set it to false
    if((nCheck % 10) === 0){
        this.setState({cardValid: 'valid'});
    } else {
        this.setState({cardValid: 'invalid'});
    }

    return;
}


render() {

    const {handleSubmit} = this.props;
    return ([
        <form key={0}>
            <Field
                name="cardNumber"
                className="cardField"
                component={this.renderUserField}
                //Had to wrap this in a timeout because the event was being triggered before the value was there
                onChange={ event => {
                    setTimeout(handleSubmit(this.onSubmit.bind(this)));

                }}
            />
        </form>,
        <div key={2} className="card-validity">
            <div key={1} className={this.state.cardType ? 'card ' + this.state.cardType : 'card'}>
            </div>
            <div className={this.state.cardValid}>
            </div>
            <div className="validity-text">{this.state.cardValid}</div>
        </div>
    ]);
}

}


export default reduxForm({
    form: 'CreditCardNumber'
})(CreditCard);

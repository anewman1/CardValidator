import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CreditCard extends Component {

    constructor() {
        super();
        this.state = {
            cardType: ''
        };
    }

    renderUserField(field) {
        return (
            <div>
                <label>Credit card </label>
                <input
                    type="number"
                    {...field.input}

                    onChange={event => {
                        field.input.onChange(event.target.value);
                    }}
                />
            </div>
        )
    }

    onSubmit(event) {
        if(typeof event.cardNumber !== 'undefined'){
            switch(true){
                case event.cardNumber.charAt(0) === '4':
                    this.setState({cardType: 'Visa'});
                    break;
                case event.cardNumber.substring(0,2) > '50' && event.cardNumber.substring(0,2) < '56':
                    this.setState({cardType: 'MasterCard'});
                    break;
                case event.cardNumber.substring(0,2) === '34' || event.cardNumber.substring(0,2) === '37':
                    this.setState({cardType: 'AMEX'});
                    break;
                case event.cardNumber.substring(0,4) === '6011' :
                    this.setState({cardType: 'Discover'});
                    break;
                default:
                    this.setState({cardType: ''});
                    break;
            }
        } else {
            this.setState({cardType: ''});
        }
    }


render() {

    const {handleSubmit} = this.props;

    // console.log('this.state', this.state);
    // console.log('this.props', this.props);
    return ([
        <form key={0}>
            <Field
                name="cardNumber"
                component={this.renderUserField}

                //Had to wrap this in a timeout because the event was being triggered before the value was there
                onChange={ event => {
                    setTimeout(handleSubmit(this.onSubmit.bind(this)));

                }}
            />
        </form>,
        <div key={1}>
            {this.state.cardType}
        </div>
    ]);
}

}

export default reduxForm({
    form: 'CreditCardNumber',
    fields: ['cardNumber']
})(CreditCard);









// onSubmit(event) {
//     if(typeof event.users !== 'undefined' && event.users.length >= 3){
//         this.setState({data: ['Loading data']});
//         fetch(''+baseURI+event.users+'&per_page=100').then((response) => {
//             return response.json()
//         })
//             .then((json) => {
//                 this.setState({data: json.items});
//             })
//     } else if (typeof event.users!== 'undefined' && event.users.length < 3){
//         this.setState({data: []});
//     }
// }

// render () {
//     let responseData = '';
//     if(this.state.data && this.state.data[0] !== 'Loading data') {
//         responseData = (this.state.data).map(function(items){
//             return <tr key={items.id} >
//                 <td>
//                     <img style={{width: 50, height: 50}} src={items.avatar_url} alt={items.avatar_url}/>
//                 </td>
//                 <td>
//                     {items.login}
//                 </td>
//                 <td>
//                     {items.type}
//                 </td>
//                 <td>
//                     {items.score}
//                 </td>
//             </tr>
//         });
//     } else if (this.state.data && this.state.data[0] === 'Loading data') {
//         responseData = <tr><td>Loading...</td></tr>
//     }
//
//
// }
// }

// export default reduxForm({
//     form: 'SearchUsers'
// })(Search);

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CreditCard extends Component {

    constructor() {
        super();
        this.state = {
            data: []
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
                    console.log('Visa!');
                    break;
                case event.cardNumber.charAt(0) === '5' &&
                     event.cardNumber.charAt(1) > 0 && event.cardNumber.charAt(1) < 6 :
                    console.log('MasterCard');
                    break;
                default:
                    console.log('nope');
                    break;

            }
        }
        // if(typeof event.users !== 'undefined' && event.users.length >= 3){
        //     this.setState({data: ['Loading data']});
        //     fetch(''+baseURI+event.users+'&per_page=100').then((response) => {
        //         return response.json()
        //     })
        //         .then((json) => {
        //             this.setState({data: json.items});
        //         })
        // } else if (typeof event.users!== 'undefined' && event.users.length < 3){
        //     this.setState({data: []});
        // }
    }


render() {

    const {handleSubmit} = this.props;

    return (
        <form>
            <Field
                name="cardNumber"
                component={this.renderUserField}

                //Had to wrap this in a timeout because the event was being triggered before the value was there
                onChange={ event => {
                    setTimeout(handleSubmit(this.onSubmit.bind(this)));

                }}
            />
        </form>
    );
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

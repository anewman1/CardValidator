import React, {Component} from 'react';
import CreditCard from './CreditCard';

class CreditCardContainer extends Component {

    render() {

        console.log('state', this.state);
        console.log('props', this.props);
        return (

            <div>
                This will contain the form and errors

                <CreditCard/>

            </div>

        );
    }
}

export default CreditCardContainer;

import React, {Component} from 'react';
import CreditCard from './CreditCard';

class CreditCardContainer extends Component {
    render() {
        return (

            <div>
                This will contain the form and errors

                <CreditCard/>

            </div>

        );
    }
}

export default CreditCardContainer;
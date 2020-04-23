import React, { Component } from 'react';
import Aux from '../../../hoc/AuxFolder/AuxComponent';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This coulds be a functionnal component, doesn't have to be a class based component
    componentDidUpdate(){
        console.log('[OrderSummary.js] componentDidUpdate')
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (<li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>{' : ' + this.props.ingredients[igKey]}
                </li>);
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Total price : <strong>{this.props.price.toFixed(2)} €</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continued}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredientsList: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsList = {};
        for (let param of query.entries()){
            // ['salad', '1']
            ingredientsList[param[0]] = +param[1];
        }
        this.setState({
            ingredientsList: ingredientsList
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); // si on annule on revient sur la page d'avant
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredientsList={this.state.ingredientsList}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}

export default Checkout;
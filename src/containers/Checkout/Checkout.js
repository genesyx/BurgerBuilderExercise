import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredientsList: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsList = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                ingredientsList[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredientsList: ingredientsList,
            totalPrice: price
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
                {/* <Route path={this.props.match.url + '/contact-data'} component={ContactData} /> */}
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (<ContactData ingredientsList={this.state.ingredientsList} price={this.state.totalPrice} {...props} />)} />
                {/* component si on veut passer un component sans variable
                        'render=' si on veut passer des paramètres/variables dans un component */}
            </div>
        )
    }
}

export default Checkout;
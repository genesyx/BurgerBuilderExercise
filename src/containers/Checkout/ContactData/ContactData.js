import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postlaCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        // alert("You continue!");
        const orderObjectToSave = {
            ingredients: this.props.ingredientsList,
            price: this.props.price,
            customer: {
                name: 'Florian JOLIVET',
                address: {
                    street: 'toto avenue',
                    postalCode: '69009',
                    counter: 'FRANCE'
                },
                email: 'jolivet.florian@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', orderObjectToSave) // .json obligatoire pour firebase
            .then(x => {
                console.log(x);
                console.log(this.props);
                this.setState({
                    loading: false,
                    purchasing: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                <input className={classes.Input} type="email" name="name" placeholder="Your email" />
                <input className={classes.Input} type="street" name="name" placeholder="Your street" />
                <input className={classes.Input} type="postal" name="name" placeholder="Your postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
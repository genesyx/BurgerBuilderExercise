import React, { Component } from "react";
import Order from './Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        ordersList: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(x => {
                const fetchedOrders = [];
                for (let key in x.data) {
                    fetchedOrders.push({
                        ...x.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    ordersList: fetchedOrders
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.ordersList.map(x => {
                    return (<Order 
                        key={x.id}
                        ingredients={x.ingredients}
                        price={x.price} />)
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredientsList: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {

        this.setState({
            loading: true
        })

        axios.get('https://burger-builder-62350.firebaseio.com/ingredients.json')
            .then(x => {
                this.setState({
                    ingredientsList: x.data,
                    loading: false
                });
            })
    }

    purchaseHandler = () => { // arrow fonction quand o
        this.setState({
            purchasing: true
        });
    }

    updatePurchaseState(ingredientsList) {
        const result = Object.keys(ingredientsList)
            .map(igKey => {
                return ingredientsList[igKey];
            })
            .reduce((sum, element) => {
                return sum + element
            }, 0);
        // Si on a au moins un ingrédiant, le burger est achetable
        this.setState({
            purchasable: result > 0 ? true : false
        })
    }

    addOneIngredientHandler = (type) => {

        // update ingredients list
        const oldCount = this.state.ingredientsList[type];
        const updatedCount = oldCount + 1;
        const updatedIngredientsList = {
            ...this.state.ingredientsList
            // ici on fait une copie du state car on ne peut pas faire 
            // de set direct (on duplique la liste avec '...' => ES6)
        };
        updatedIngredientsList[type] = updatedCount; // nouveau compteur pour ce type

        // update total price
        const currentIngredientPrice = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + currentIngredientPrice;

        this.setState({
            ingredientsList: updatedIngredientsList,
            totalPrice: newTotalPrice
        });

        this.updatePurchaseState(updatedIngredientsList);
    }

    deleteOneItemHandler = (type) => {

        // update ingredients list
        const oldCount = this.state.ingredientsList[type];
        const updatedCount = oldCount - 1;
        const updatedIngredientsList = {
            ...this.state.ingredientsList
            // ici on fait une copie du state car on ne peut pas faire 
            // de set direct (on duplique la liste avec '...' => ES6)
        };
        updatedIngredientsList[type] = updatedCount; // nouveau compteur pour ce type

        // update total price
        const currentIngredientPrice = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - currentIngredientPrice;

        this.setState({
            ingredientsList: updatedIngredientsList,
            totalPrice: newTotalPrice
        });

        this.updatePurchaseState(updatedIngredientsList);
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        let queryParamsList = [];
        for (let i in this.state.ingredientsList){
            queryParamsList.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredientsList[i]));
        }
        let queryParamsStringFormat = queryParamsList.join('&');
        queryParamsList.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParamsStringFormat
        }); // permet de se rediriger vers /checkout (une fois qu'on a terminé)
    }

    render() {
        const disabledInfos = {
            ...this.state.ingredientsList
        };
        for (let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }

        // en gros ici, on met les valeurs par défaut des modules (qu'on veut afficher ou cacher)
        let orderSummary = null; // On met à null parce que par défaut il n'est pas afficher
        let burger = <Spinner />; // on met un spinner parce qu'il n'est pas encore chargé

        if (this.state.ingredientsList) {
            burger = (
                <Wrapper>
                    <Burger ingredientsList={this.state.ingredientsList}></Burger>
                    <BuildControls
                        ingredientAdded={this.addOneIngredientHandler}
                        ingredientRemoved={this.deleteOneItemHandler}
                        totalPrice={this.state.totalPrice}
                        disabledInfos={disabledInfos}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}></BuildControls>
                </Wrapper>
            );

            orderSummary = <OrderSummary
                cancelled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}
                ingredients={this.state.ingredientsList}
                price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Wrapper>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Wrapper>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);


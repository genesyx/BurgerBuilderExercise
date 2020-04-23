import React, { Component } from 'react';
import Aux from '../../hoc/AuxFolder/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 2,
    bacon: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredientsList: {
            cheese: 0,
            salad: 0,
            bacon: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert("You continue!");
    }

    render() {
        const disabledInfos = {
            ...this.state.ingredientsList
        };
        for (let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        cancelled={this.purchaseCancelHandler}
                        continued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredientsList} 
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredientsList={this.state.ingredientsList}></Burger>
                <BuildControls
                    ingredientAdded={this.addOneIngredientHandler}
                    ingredientRemoved={this.deleteOneItemHandler}
                    totalPrice={this.state.totalPrice}
                    disabledInfos={disabledInfos}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}></BuildControls>
            </Aux>
        );
    };
}

export default BurgerBuilder;


import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredientsList) // Renvoi ["cheese", "salad", "bacon", "meat"]
        .map(key => {
            return [...Array(props.ingredientsList[key])].map((_, i) => { // Récupère le nombre de ingrédients pour chaque ingrédient // c'est comme un for dans un for
                // console.log("Burger-key = " + key + i); // permet d'avoir une clé unique en combinant le nom et l'index
                // console.log("Burger-type = " + key); // récupère le type au format string
                return <BurgerIngredient key={key + i} type={key} /> // on passe le nombre au component BurgerIngredient
            });
        }) // là on a une liste de liste d'ingrédients
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue)
        }, []); // là on transforme la liste pour avoir une liste d'ingrédients "à plat"
        // Pour pouvoir manipuler la liste plus facilement

        if(transformedIngredients.length === 0)
        {
            transformedIngredients = <p>Please start adding ingredient !</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
};

export default burger;
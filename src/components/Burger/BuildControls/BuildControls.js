import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price : <strong>{props.totalPrice.toFixed(2)}€</strong></p>
        {controls.map(c => (
            <BuildControl
                key={c.label}
                label={c.label}
                added={() => props.ingredientAdded(c.type)}
                removed={() => props.ingredientRemoved(c.type)}
                disabled={props.disabledInfos[c.type]}></BuildControl>
        ))}
        <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>Order now!</button>
    </div>
);

export default buildControls;
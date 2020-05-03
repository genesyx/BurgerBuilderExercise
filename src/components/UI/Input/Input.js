import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(x => (
                        <option key={x.value} value={x.value}>
                            {x.displayValue}
                        </option>)
                    )}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>);
};

export default input;
import React from 'react'
import Aux from '../../../hoc/Auxilliary'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    
    const ingredientSummary = Object.keys(props.ingredients)
                              .map(igKey => {
                                  return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
                              })
    
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following Ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.canceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;
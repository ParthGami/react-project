import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../Component/Burger/Burger'
//import BurgerControls from '../../Component/Burger/BuildControls/BuildControls'
import BuildControls from '../../Component/Burger/BuildControls/BuildControls'
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary'
import Modal from '../../Component/UI/Modal/Modal'

const INGREDIENTS_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component{
    
    state = {
        ingredients : {
            'cheese' : 0,
            'bacon' : 0,
            'meat' : 0,
            'salad' : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey] 
                    })
                    .reduce((sum,el) => {
                        return sum + el
                    },0)
        this.setState({purchasable : sum > 0})
    }
    
    IngredientAddedHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1
        const UpdatedIngredients = {...this.state.ingredients}
        UpdatedIngredients[type] = updateCount

        const oldPrice = this.state.totalPrice
        const priceAddition = INGREDIENTS_PRICES[type]
        const newPrice = oldPrice + priceAddition

        this.setState({
            totalPrice : newPrice,
            ingredients : UpdatedIngredients
        })
        this.updatePurchasable(UpdatedIngredients)
    }

    IngredientRemovedHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount-1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updateCount

        const oldPrice = this.state.totalPrice
        const removedPrice = INGREDIENTS_PRICES[type]
        const updatePrice = oldPrice - removedPrice

        this.setState({
            totalPrice: updatePrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasable(updatedIngredients)
    }

    purchasingHandler = () => {
        this.setState({purchasing: true})
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchasingContinueHandler = () => {
        alert('You can Continue')
    }

    render(){
        let disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
            return(
                <Aux>
                    <Modal show={this.state.purchasing} clicked={this.purchasingCancelHandler}>
                        <OrderSummary 
                        ingredients={this.state.ingredients}
                        canceled = {this.purchasingCancelHandler}
                        price = {this.state.totalPrice}
                        continued = {this.purchasingContinueHandler}/>
                    </Modal>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.IngredientAddedHandler}
                        ingredientRemoved = {this.IngredientRemovedHandler}
                        disable = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchasingHandler}
                        price = {this.state.totalPrice}/>
                </Aux>
            )
        }
}

export default BurgerBuilder
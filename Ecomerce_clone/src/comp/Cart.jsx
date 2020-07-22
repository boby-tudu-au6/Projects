import React, { Component } from 'react'
import CartProduct from './CartProduct'
import {connect} from 'react-redux'
import {updateCart,deleteCart} from '../redux/action/action'
import {Redirect} from 'react-router-dom'

class Cart extends Component {
    render() {
        const {loggedUser} = this.props.userState
        const {cart} = this.props.cartState
        let total = 0
        cart.forEach(element => {
            total = total + (element.quantity * element.price)
        });
        return (
            <main className="page shopping-cart-page">
                {loggedUser.length ===0?<Redirect to='/login'/>:null}
        <section className="clean-block clean-cart dark">
            <div className="container">
                <div className="content">
                    <div className="row no-gutters">
                        <div className="col-md-12 col-lg-8">
                            <div className="items">
                                {cart.map((p)=><CartProduct key={p.id} id={p.id} title={p.title} price={p.price} quantity={p.quantity} img={p.img}/>)}
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <div className="summary">
                                <h3>Summary</h3>
        <h4><span className="text">Subtotal</span><span className="price">{total}RS.</span></h4>
                                <h4><span className="text">Discount</span><span className="price">0RS.</span></h4>
                                <h4><span className="text">Shipping</span><span className="price">0RS.</span></h4>
        <h4><span className="text">Total</span><span className="price">{total}RS.</span></h4>
        <button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.checkOut}>Checkout</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
        )
    }
    checkOut = ()=>{
        if (window.confirm("Are you sure (your cart item will be removed)")) { 
            return this.props.checkout()
        }
        return alert('order cancel')
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        checkout:()=>{dispatch({type:"CHECKOUT"})}
}}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)

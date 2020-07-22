import React, { Component } from 'react'
import {connect} from 'react-redux'
import { updateCart,deleteCart } from '../redux/action/action'


class CartProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             quantity:1
        }
    }
    
    render() {
        const {id,img,price,quantity,title} = this.props
        return (
        <div className="product">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-3">
                    <div className="product-image"><img className="img-fluid d-block mx-auto image" src={img} alt='img'/></div>
                </div>
        <div className="col-md-5 product-info"><h2 className="product-name">{title}</h2>
                    <div className="product-specs">
                        <div>
                            <span>Price:&nbsp;</span>
                            <span className="value">{price} Rs.</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-2 quantity">
                    <label className="d-none d-md-block" htmlFor="quantity">Quantity</label><input type="number" id={id} className="form-control quantity-input" value={this.state.quantity} onChange={this.handleChange}/></div>
                <div className="col-6 col-md-2 price">
                    <span>{price*quantity}Rs.</span>
                    <span><button className='btn btn-outline-danger' onClick={this.handleDelete}><i className="fa fa-trash-o"></i></button></span>
                </div>
            </div>
        </div>
        )
    }
    handleChange = (e)=>{
        this.setState({quantity:e.target.value})
        const payload = {
            userid:this.props.userState.loggedUser[0],
            id:parseInt(e.target.id),
            quantity:parseInt(e.target.value),
            img:this.props.userState.products[e.target.id].img,
            title:this.props.userState.products[e.target.id].title,
            price:this.props.userState.products[e.target.id].price
        }
        this.props.updateCart(payload)
    }
    handleDelete = (e,id=this.props.id)=>{
        const payload = {
            id,
            userid:this.props.userState.loggedUser[0]
        }
        this.props.delete_cart(payload)
    }
}
const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        updateCart:(payload)=>{dispatch(updateCart(payload))},
        delete_cart:payload=>{dispatch(deleteCart(payload))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartProduct)
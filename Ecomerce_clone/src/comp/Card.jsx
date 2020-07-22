import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addCart,deleteCart} from '../redux/action/action'

class Card extends Component {
    render() {
        const {loggedUser} = this.props.userState
        return (
            <div className=' col-3 p-3 text-center'>
                <div className="card shadow border-0 rounded">
                    <img className="card-img-top" src={this.props.img} alt="Cardimage"/>
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <p className="card-text">{this.props.price} RS.</p>
                        <button className='btn btn-outline-warning col-10 mb-2' id={this.props.id} onClick={this.handleClick}>Add to Cart</button>
                    </div>
                </div>
            </div>  
        )
    }
    handleClick = (e)=>{
        if(this.props.userState.loggedUser.length ===0){return alert("login first")}
        const {id,img,title,price} = this.props
        const userid = this.props.userState.loggedUser[0]
        const payload = {userid,id,img,title,price,quantity:1}
        this.props.add_cart(payload)
        return alert("successfully added to cart")
    }
    
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        add_cart:payload=>{dispatch(addCart(payload))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Card)

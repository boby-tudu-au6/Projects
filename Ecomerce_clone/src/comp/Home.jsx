import React, { Component } from 'react'
import Card from './Card'
import {connect} from 'react-redux'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const {products} = this.props.userState
        return (
            <div>
                {/* jumbotron here */}
                <div className="jumbotron rounded-0 text-light text-center" style={{height:"300px"}}>
                    <h1 className='display-2 text-shadow'>Best Place to buy shoes</h1>
                    <h4 className='text-shadow'>Get fast delivery benifits on shoes</h4>
                </div>


                {/* products here */}
                <div className='container'>
                    <div className='row d-flex'>
                        {products.map((p)=><Card key={p.id} id={p.id} img={p.img} title={p.title} price={p.price}/>)}
                    </div>
                </div>

                {/* footer */}
                <div className='footer col-12 text-center p-3 bg-warning mt-4'>Shoesie</div>
            </div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}

export default connect(mapStateToProps)(Home)

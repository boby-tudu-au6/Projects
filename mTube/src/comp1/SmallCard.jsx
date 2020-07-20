import React, { Component } from 'react'
import {getLogo} from '../redux/actions/action'
import {connect} from 'react-redux'
import {gapi} from 'gapi-script'
import {Link} from 'react-router-dom'

class SmallCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title:this.props.title,
            view:this.props.view,
            duration:'',
            thumbnail:this.props.thumbnail,
            channelTitle:this.props.channelTitle,
            channelId:this.props.channelId,
            channelLogo:'',
            id:this.props.id
        }
    }
    async componentDidMount(){
        const payload = {id:this.state.channelId}
        const {result} = await gapi.client.youtube.channels.list({
            part:['snippet'],
            id:[payload.id]
        })
        this.setState({
            channelLogo:result.items[0].snippet.thumbnails.default.url
        })
    }
    render() {
        // console.log(this.props.logo.snippet.thumbnails.default)
        let title1 = ''
        if(this.state.title.length > 30){
            title1 = this.state.title.slice(0,30)+"..."
        }else{
            title1 = this.state.title
        }
        const to = '/player/'+this.state.id
        return (
        <div className="card col-3 p-2 border-0">
            <img className="card-img-top" src={this.state.thumbnail.url} alt='sdf' style={{width:"100%"}}/>
            <div className="card-body pt-1 row">
                <div className="col-2 p-0 m-0">
                <img alt="img" className="p-0 col-12 rounded-circle" src={this.state.channelLogo}/>
                </div>
                <div className="col-10 p-0 m-0 pl-1">
                    <h6 className="p-0 m-0"><small><strong>{title1}</strong></small></h6>
                    <p className="p-0 m-0"><small>{this.state.channelTitle}</small></p>
                    <Link to={to} className="stretched-link p-0 m-0"></Link>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        getLogo:(payload)=>dispatch(getLogo(payload))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SmallCard)
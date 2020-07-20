import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getPlayer,getRelated,getComment, getLogo} from '../redux/actions/action'
import ResultComponent from './ResultComponent'
import Comments from './Comments'
import {gapi} from 'gapi-script'
import './style.css'

class PlayerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             videoid:'',
             player:'',
             related:[],
             channelLogo:''
        }
    }   
    
    async componentDidMount(){
        const videoId = this.props.match.params.videoId
        this.props.getPlayer({id:videoId})
        setTimeout(async ()=>{
            const id = this.props.player.id
            this.props.getRelated({id})
            this.props.getComment({id})
            const channelId = this.props.player.snippet.channelId
            const {result} = await gapi.client.youtube.channels.list({
                part:['snippet'],
                id:channelId
            })
            this.setState({
                channelLogo:result.items[0].snippet.thumbnails.default.url
            })
        },5000)
        
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.props.getPlayer({id:this.props.match.params.videoId})
        }
    }
    render() {
        console.log(this.state)
        const {snippet} = this.props.player
        const title = snippet===undefined?"": snippet.title.length >20? snippet.title.slice(0,20):snippet.title
        const desc = snippet===undefined?"": snippet.description.length>30?snippet.description.slice(0,30):snippet.description
        const videoid = 'https://www.youtube.com/embed/'+this.props.player.id
        const {related} = this.props
        return (
        <div className="body col-12 mt-5 pl-4">
        <div className="row col-12 m-auto white pl-5 pr-0">
        <div className="col-7 mt-3" style={{height:"83vh",overflowY:"scroll"}}>
            <iframe src={videoid} className='border-0' width='100%' height='360' title='title'>
            </iframe>
            <h3>{title}</h3>
            <p className="text-secondary">{snippet===undefined?"":snippet.publishedAt.slice(0,10)}</p>
                <hr/>   
                <div className="row col-12">
                    <img src={this.state.channelLogo} alt="img" className="p-0 m-0 col-1 rounded-circle"/>
                    <div className="col-11 pt-2">
                        <h6>{snippet===undefined?"":snippet.channelTitle}</h6>
                    </div>
                </div>
                
                <p className="text-secondary">{desc}</p>
                <hr/>
                <Comments comment={this.props.comment}/>
        </div>
        <div className="col-5 mt-3" style={{height:'83vh',overflowY:'scroll'}}>
            {related===null?null:related.map(d=>
            {const {snippet} = d
            return <ResultComponent key={d.id.videoId} id={d.id.videoId} title={snippet.title} thumbnail={snippet.thumbnails.medium} channelTitle={snippet.channelTitle} />}
            )}
        </div>
    </div>
        </div>
        )
    }
}

const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        getPlayer:(payload)=>dispatch(getPlayer(payload)),
        getRelated:(payload)=>dispatch(getRelated(payload)),
        getComment:(payload)=>dispatch(getComment(payload))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlayerPage)
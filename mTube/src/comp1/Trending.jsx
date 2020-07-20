import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getTrending } from '../redux/actions/action'
import ResultComponent from './ResultComponent'

class Trending extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             videos:[]
        }
    }
    
    componentDidMount(){
        this.props.getTrending()
    }
    render() {
        return (
            <div className='body col-12 mt-5 pl-4 pt-3'>
                {
                this.props.data.map(d=>
                {const {snippet,statistics,contentDetails} = d
                return <ResultComponent key={d.id} id={d.id} title={snippet.title} thumbnail={snippet.thumbnails.medium} channelTitle={snippet.channelTitle} view={statistics.viewCount
                } duration={contentDetails.duration} />}
                )}
            </div>
        )
    }
}
const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        getTrending:()=>dispatch(getTrending())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Trending)
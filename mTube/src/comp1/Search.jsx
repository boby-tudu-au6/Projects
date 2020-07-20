import React, { Component } from 'react'
import ResultComponent from './ResultComponent'
import {connect} from 'react-redux'
import { getSearch } from '../redux/actions/action'

class Search extends Component {
    componentDidMount(){
        this.props.getSearch(this.props.match.params.q)
    }
    render() {
        return (
            <div className='body col-12 mt-5 pl-4 pt-3'>
                {
                this.props.searchData.map(d=>
                {const {snippet} = d
                return <ResultComponent key={d.id} id={d.id.videoId} title={snippet.title} thumbnail={snippet.thumbnails.medium} channelTitle={snippet.channelTitle} />}
                )}
            </div>
        )
    }
}

const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        getSearch:(payload)=>dispatch(getSearch({q:payload}))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Search)
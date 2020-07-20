import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getHome} from '../redux/actions/action'
import SmallCard from './SmallCard'

class Home extends Component {
    render() {
        return (
            <div className="body col-12 mt-5 pl-4">
                <div className="col-11 white m-auto pt-2">
                <div className="col-12 p-1 m-0">
                    <h3><small>Recomended</small></h3>
                </div>
                <div className="col-12 row p-0">
                    {this.props.home.map(d=>{
                        // console.log(d)
                        const {snippet,statistics,contentDetails} = d
                        return <SmallCard key={d.id} title={snippet.title} thumbnail={snippet.thumbnails.medium} channelTitle={snippet.channelTitle} view={statistics.viewCount} duration={contentDetails.duration} channelId={snippet.channelId} id={d.id}/>}
                      )}
                </div>
            </div>
        </div>
        )
    }
    componentDidMount(){
        this.props.getHome()
    }
}

const mapStateToProps = state => {return{...state}}
const mapDispatchToProps = dispatch =>{
    return {
        getHome:()=>dispatch(getHome())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)


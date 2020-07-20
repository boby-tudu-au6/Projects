import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ResultComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             thumbnail:this.props.thumbnail,
             view:this.props.view,
             title:this.props.title,
             duration:'',
             channelTitle:this.props.channelTitle,
             id:this.props.id
        }
    }
    
    componentDidMount(){
    }
    render() {
        let title1 = ''
        if(this.state.title.length > 50){
            title1 = this.state.title.slice(0,50)+'...'
        }else{
            title1 = this.state.title
        }
        const to = '/player/'+this.state.id
        return (
            <div className="row col-11 ml-5 mb-2 white pl-0">
            <div className="col-3 p-1">
                <img src={this.state.thumbnail.url} alt="img" width="100%"/>
            </div>
            <div className="col-9 p-2">
                <h6 className="p-0 m-0"><Link to={to} className='text-dark'>{title1}</Link></h6>
                <p className="p-0 m-0 text-secondary"><small>{this.state.channelTitle}</small></p>
                <p className="p-0 m-0 text-secondary"><small>{this.state.view}</small></p>
                <p className="p-0 m-0 text-secondary"><small>{this.state.duration}</small></p>
            </div>
        </div>
        )
    }

    convertDuration = (duration)=>{
        const dur = duration
        const er = dur.replace('PT',"")
        const hr = er.replace("H",":")
        const pt = hr.replace("M",":")
        const sec = pt.replace("S","")
        return sec
    }
}

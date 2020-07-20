import React, { Component } from 'react'
import CommentBox from './CommentBox'

export default class Comments extends Component {
    render() {
        return (
            <div className="comment">
                    <h6>Comments</h6>
                    {this.props.comment.map(d=>
                    <CommentBox key={d.id} id={d.id} textOriginal={d.snippet.topLevelComment.snippet.textOriginal}/>)}
                </div>
        )
    }
}

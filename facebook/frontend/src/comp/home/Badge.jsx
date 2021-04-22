import React from 'react'

export default function Badge(props) {
    return (
    <div style={{position:"absolute"}}>
        <span 
        className="badge badge-danger" 
        style={{
            position:'absolute',
            left:'30px',
            fontSize:"10px"
        }}>{props.data}</span>
    </div>
    )
}

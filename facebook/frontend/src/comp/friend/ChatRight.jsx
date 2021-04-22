import React from 'react'

function ChatRight(props) {
    // const float = `text-${props.right}`
    return (
        <div className='text-right'>
            <p className='text-left text-light mb-1 p-2 rounded-left rounded-bottom shadow bg-primary d-inline-block bg-danger'>{props.data.body.chat}</p>
        </div>
    )
}

export default ChatRight

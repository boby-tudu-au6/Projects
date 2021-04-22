import React from 'react'

function ChatLeft(props) {
    return (
        <div className='text-left'>
            <p className='text-left text-light mb-1 p-2 rounded-right rounded-bottom shadow bg-primary d-inline-block bg-primary'>{props.data.body.chat}</p>
        </div>
    )
}

export default ChatLeft

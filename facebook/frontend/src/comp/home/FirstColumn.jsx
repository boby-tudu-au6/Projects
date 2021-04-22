// import React, { Component } from 'react'

// export default class FirstColumn extends Component {
//     render() {
//         return (
//             <>
//                 <div className="col-3 full">
//                 <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
//                 <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
//                 <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
//                 <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
//                 </div>
//             </>
//         )
//     }
// }


import React from 'react'

function FirstColumn() {
    return (
        <div className="col-3 full">
            <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
            <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
            <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
            <div className="col-12 bg-light mb-2 rounded hid" style={{height:'20vh'}}></div>
        </div>
    )
}

export default FirstColumn

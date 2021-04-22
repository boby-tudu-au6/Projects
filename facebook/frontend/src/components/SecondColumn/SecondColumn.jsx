import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

function SecondColumn(props) {
    const [page, setPage] = useState(1);
    const { location, getPost } = props;
    useEffect(() => {
        if(location.pathname==='/profile'){
            props.getPost({userid:props.userdata._id,page:props.pageid})
        }
        if(props.location.pathname==='/'){
            props.getPost({userid:props.userid,pageid:props.pageid})
        }
    },[])

    const handleChange=(e)=>{
        props.setPageId(e)
        if(props.location.pathname==='/'){
            props.getPost({userid:props.userid,page:e})
        }
        else if(props.location.pathname==='/profile'){
            props.getPost({userid:props.userdetails,page:e})
        }
        setPage(e)
    }

    return (
        <div>
            
        </div>
    )
}

export default connect(state=> { return { ...state }})(SecondColumn);

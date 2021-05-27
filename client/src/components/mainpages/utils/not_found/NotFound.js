import React from 'react'
import './NotFound.css'
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className='not-found'>
            <h2>404 | Not Found</h2>
            <h2>Looks like you got lost. Go to <Link to='/'>Shopping</Link></h2>
        </div>
    )
}

export default NotFound

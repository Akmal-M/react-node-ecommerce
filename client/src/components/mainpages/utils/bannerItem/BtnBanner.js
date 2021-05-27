import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnBanner({banner, deleteBanner}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteBanner(banner._id, banner.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_banner/${banner._id}`}>
                        Edit
                    </Link>
                </>
                : null
            }
                
        </div>
    )
}

export default BtnBanner

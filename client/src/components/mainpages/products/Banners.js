import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import BannerItem from '../utils/bannerItem/BannerItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import LoadMore from './LoadMore'


const Banners = () => {
    const state = useContext(GlobalState)
    const [banners, setBanners] = state.bannersAPI.banners
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.bannersAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        banners.forEach(banner => {
            if(banner._id === id) banner.checked = !banner.checked
        })
        setBanners([...banners])
    }

    const deleteBanner = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteBanner = axios.delete(`/api/banners/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteBanner
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        banners.forEach(banner => {
            banner.checked = !isCheck
        })
        setBanners([...banners])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        banners.forEach(banner => {
            if(banner.checked) deleteBanner(banner._id, banner.images.public_id)
        })
    }

    if(loading) return <div><Loading /></div>
    return (
        <div className='mt-20'>

            {
                isAdmin &&
                <div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Delete ALL</button>
                </div>
            }

            <div className='lg:mt-24 mt-20'>
                <div className=''>
                    {
                        banners.map(banner => {
                            return(
                                <div className=''>
                                    <BannerItem key={banner._id} banner={banner} isAdmin={isAdmin}/>
                                </div>
                            )
                        })
                    }
                </div>
                {banners.length === 0 && <Loading/>}
            </div>

            <LoadMore />
            {banners.length === 0 && <Loading />}
        </div>
    )
}

export default Banners
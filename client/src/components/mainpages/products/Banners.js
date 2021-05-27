import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import BannerItem from '../utils/bannerItem/BannerItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'


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
    console.log(banners)

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

            <div>
                <div className=''>
                    {
                        banners.map(banner => {
                            return(
                              <div>


                                     <div style={isAdmin ? { display:'block' } : { display:'none' }}>
                                         <BannerItem key={banner._id} banner={banner} isAdmin={isAdmin}
                                                     deleteBanner={deleteBanner} handleCheck={handleCheck}/>
                                     </div>

                                  {
                                      !isAdmin &&
                                      <Swiper
                                          spaceBetween={0}
                                          slidesPerView={1}
                                          loop={"true"}
                                          speed={3000}
                                          autoplay={{

                                              speed: 1000,
                                              disableOnInteraction: false,
                                              disableKeyboardControls: false,
                                          }}

                                      >
                                          <SwiperSlide >
                                              <div><img src={banner.images.url} alt=""/></div>
                                          </SwiperSlide>

                                      </Swiper>
                                  }

                              </div>
                            )
                        })
                    }
                </div>
                {banners.length === 0 && <Loading/>}
            </div>


            {banners.length === 0 && <Loading />}
        </div>
    )
}

export default Banners
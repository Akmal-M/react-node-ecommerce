import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom";
const BannerItem = ({banner, isAdmin}) => {
    return (
        <div className=' relative overflow-hidden' >
            {
                isAdmin &&
                <input type='checkbox' checked={banner.checked} className='absolute w-8 h-8 top-2 left-2'/>
            }
            {/*<div className='flex justify-center'>*/}
            {/*    <img src={banner.images.url} alt="" className='  w-full  object-cover'*/}
            {/*    />*/}
            {/*</div>*/}
                    <div key={banner._id} className=' h-96 w-full' style={{backgroundImage:`url(${banner.images.url})`}}/>


            {
                isAdmin ? <div className='grid grid-cols-2 lg:gap-5 gap-2'>
                    <Link to='#' id={'btn_buy'}
                          className='lg:mx-5 lg:px-3  lg:py-1  bg-btnColor lg:text-xl text-md text-white text-center w-full'>
                        Delete
                    </Link>
                    <Link id={'btn_view'} to={`/edit_banner/${banner._id}`}
                          className='lg:mx-5 lg:py-1 lg:px-5 px-2 bg-btnColor2 lg:text-xl text-md text-white text-center w-full'>
                        Edit
                    </Link>
                </div> : null
            }

            {/*<Swiper*/}
            {/*    spaceBetween={1}*/}
            {/*    slidesPerView={1}*/}
            {/*    loop={"true"}*/}
            {/*    speed={3000}*/}
            {/*    autoplay={{*/}

            {/*        speed: 1000,*/}
            {/*        disableOnInteraction: false,*/}
            {/*        disableKeyboardControls:false,*/}
            {/*    }} className=" ">*/}
            {/*    {banner.images.url && <SwiperSlide>*/}
            {/*        <div className=' h-96 w-full' style={{backgroundImage:`url(${banner.images.url})`}}/>*/}

            {/*    </SwiperSlide>}*/}

                {/*{banner.images.url[1] && <SwiperSlide>*/}
                {/*    {banner.images.url[1]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[2] && <SwiperSlide>*/}
                {/*    {banner.images.url[2]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[3] && <SwiperSlide>*/}
                {/*    {banner.images.url[3]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[4] && <SwiperSlide>*/}
                {/*    {banner.images.url[4]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[5] && <SwiperSlide>*/}
                {/*    {banner.images.url[5]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[6] && <SwiperSlide>*/}
                {/*    {banner.images.url[6]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[7] && <SwiperSlide>*/}
                {/*    {banner.images.url[7]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[8] && <SwiperSlide>*/}
                {/*    {banner.images.url[8]}*/}
                {/*</SwiperSlide>}*/}

                {/*{banner.images.url[9] && <SwiperSlide>*/}
                {/*    {banner.images.url[9]}*/}
                {/*</SwiperSlide>}*/}
            {/*</Swiper>*/}

        </div>
    );
}

export default BannerItem;

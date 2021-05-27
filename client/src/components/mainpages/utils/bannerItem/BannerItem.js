import React from 'react';
import BtnBanner from "./BtnBanner";



const BannerItem = ({banner, isAdmin, deleteBanner, handleCheck}) => {
    return (
        <div className=' relative overflow-hidden'>
            {
                isAdmin &&
                <input type='checkbox' checked={banner.checked} className='absolute w-8 h-8 top-2 left-2'/>
            }

            <img src={banner.images.url} alt="" />

            <BtnBanner banner={banner} deleteBanner={deleteBanner}/>

        </div>
    );
}

export default BannerItem;

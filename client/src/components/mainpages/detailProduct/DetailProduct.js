import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import CardItem from "../utils/cardItem/cardItem";


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img  src={detailProduct.images.url} alt=""
                className='lg:max-w-xl max-w-xs lg:mt-0 mt-10'/>
                <div className="box-detail">
                    <div className="row">
                        <h2 className='lg:text-4xl text-3xl py-5 lg:py-10 text-gray-500'>{detailProduct.title}</h2>
                        <h6 className='text-gray-400'>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span className='lg:text-3xl text-2xl text-gray-500'>$ {detailProduct.price}</span>
                    {/*<p>{detailProduct.description}</p>*/}
                    <p>{detailProduct.content}</p>
                    <p>Sold: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                && <CardItem key={product._id} product={product} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct

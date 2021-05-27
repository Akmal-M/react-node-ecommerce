import React, {useContext} from 'react';
import './cardItem.css'
import BtnRender from "../productItem/BtnRender";
import {Link} from "react-router-dom";
import {GlobalState} from "../../../../GlobalState";

const CardItem = ({product, deleteProduct, handleCheck}) => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div className="card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                                  onChange={() => handleCheck(product._id)}/>
            }
            <Link id="btn_view" to={`/detail/${product._id}`}>
                <div className="imgBx">
                    <img
                        src={product.images.url} alt=""/>
                </div>
            </Link>
            <div className="contextBx">
                {/*<h3 className='uppercase'>{product.title}</h3>*/}
                <h2 className="price">${product.price}</h2>
                <p className='capitalize'>{product.title}</p>
                {
                    !isAdmin ?

                        <a href="#" className="buy"><Link id="" className='buy' to="#!"
                                                          onClick={() => addCart(product)}>Buy
                            now</Link></a>
                        : <BtnRender product={product} deleteProduct={deleteProduct}/>
                }
            </div>


        </div>
    );
};

export default CardItem;
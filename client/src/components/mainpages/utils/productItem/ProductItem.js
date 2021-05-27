import React from 'react'
import BtnRender from './BtnRender'
import {Link} from "react-router-dom";

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
       <div>
           <div className="product_card">
               {
                   isAdmin && <input type="checkbox" checked={product.checked}
                                     onChange={() => handleCheck(product._id)} />
               }
               <img src={product.images.url} alt="" />

               <div className="product_box">
                   <h2 title={product.title}>{product.title}</h2>
                   <span>${product.price}</span>
                   <p>{product.description}</p>
               </div>



           </div>
           {
               isAdmin ?
                   <>
                       <Link id="btn_buy" to="#!"
                             onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                           Delete
                       </Link>
                       <Link id="btn_view" to={`/edit_product/${product._id}`}>
                           Edit
                       </Link>
                   </> : null}
       </div>
    )
}

export default ProductItem;

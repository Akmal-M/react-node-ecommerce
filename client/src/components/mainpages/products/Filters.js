import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu lg:rounded-full rounded-xl  ">
            <div className="row order-last lg:order-first">
                <span className='font-bold text-gray-500'>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value='' className='text-xl' >All Products</option>
                    {
                        categories.map(category => (
                            <option className='text-xl' value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input className='pl-5 lg:order-2 order-first' type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort lg:order-last order-2">
                <span className='font-bold text-gray-500'>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} className='cursor-pointer text-xl outline-none'>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Highest-Low</option>
                    <option value='sort=price'>Price: Low-Highest</option>
                </select>
            </div>
        </div>
    )
}

export default Filters

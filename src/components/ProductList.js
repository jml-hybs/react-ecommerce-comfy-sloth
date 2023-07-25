import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import Product from './Product'

const ProductList = () => {

  const { filtered_products: products, grid_view } = useFilterContext()
  if (products.length < 1) {
    return <h5> sorry, no products match</h5>
  }
  if (!grid_view) {
    return <ListView products={products} />
  }
  return <GridView products={products} />
}

export default ProductList

import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

export const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: true,
  list_view: false,
  sort: 'price lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false

  }
}
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e) => {
    const value = e.target.value
    console.log(value);
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })

  }, [products, state.sort, state.filters])

  //filter function
  const updateFilter = (e) => {
    const key = e.target.name
    let value = e.target.value
    // checks for the shipping/ separated because checkbox uses e.target.checked not value
    if (key === 'shipping') {
      value = e.target.checked
    }
    console.log(key, value);
    dispatch({ type: UPDATE_FILTERS, payload: { key, value } })
  }



  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilter, clearFilter }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}

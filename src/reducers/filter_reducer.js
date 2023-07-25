import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { initialState } from '../context/filter_context'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters, max_price: maxPrice,
          price: maxPrice,
        }
      }
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
        list_view: false
      }
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
        list_view: true
      }
    case UPDATE_SORT:

      return {
        ...state,
        sort: action.payload
      }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        filtered_products: tempProducts
      }
    case UPDATE_FILTERS: {
      const { filters } = state
      const { key, value } = action.payload
      const updatedFilters = { ...filters, [key]: value }
      return {
        ...state,
        filters: updatedFilters
      }
    }
    case FILTER_PRODUCTS:
      const { all_products, filters } = state
      const { text, category, company, color, price, shipping } = filters
      let filteredProducts = [...all_products];
      // Apply filters based on the values received from the payload

      if (text) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (company !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product) => product.company === company
        );
      }

      if (color !== 'all') {
        filteredProducts = filteredProducts.filter((product) =>
          product.colors.includes(color)
        );
      }
      if (price) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= parseInt(price)
        );
      }
      if (shipping) {
        filteredProducts = filteredProducts.filter(
          (product) => product.shipping === shipping
        );
      }
      return {
        ...state,
        filtered_products: filteredProducts,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          company: 'all',
          color: 'all',
          shipping: false,
          price: state.filters.max_price
        }
      };
    default:
      return state;
  }
}

export default filter_reducer

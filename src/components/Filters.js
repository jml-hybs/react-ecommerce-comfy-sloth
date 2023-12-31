import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { filters, all_products, updateFilter, clearFilter } = useFilterContext()
  const { text } = filters
  const colors = getUniqueValues(all_products, 'colors')
  const category = getUniqueValues(all_products, 'category')
  const company = getUniqueValues(all_products, 'company')
  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input name='text' type="text" value={text} placeholder='search' className='search-input' onChange={updateFilter} />
        </div>
        <div className="form-control">
          <h5>Company</h5>
          <select className='company' name="company" id="company" value={filters.company} onChange={updateFilter} >
            {company.map((value) => {
              return <option key={value}>{value}</option>
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>Category:</h5>
          {category.map((cat) => {
            return <button className={filters.category === cat ? 'active' : null} type='button' name='category' value={cat} onClick={updateFilter} key={cat}>{cat}</button>
          })}
        </div>
        <div className="form-control">
          <h5>colors</h5>
          <div className='colors'>
            {colors.map((color, index) => {
              if (color === 'all') {
                return <button name='color' className={filters.color === color ? 'all-btn active' : 'all-btn'} key={index} value='all' onClick={updateFilter}>all</button>
              }
              return <button key={index} name='color' style={{ background: color }} className={filters.color === color ? 'color-btn active' : 'color-btn'} value={color} onClick={updateFilter}>{filters.color === color ? <FaCheck /> : null}</button>
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p>{formatPrice(filters.price)}</p>
          <input type="range" name='price' value={filters.price} min={filters.min_price} max={filters.max_price} onChange={updateFilter} />
        </div>
        <div className="form-control">
          <div className='shipping'>
            <label>free shipping</label>
            <input type="checkbox" name='shipping' value={filters.shipping} onClick={updateFilter} />
          </div>
        </div>
        <div className="form-control">
          <h5>Clear All Filters</h5>
          <button type='button' className='clear-btn' onClick={clearFilter}>Clear Filters</button>
        </div>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters

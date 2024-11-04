import React, { Fragment } from 'react'
import { ProductProps } from './Product'
import Product from './Product'

interface ProductListInterface {
  list: Array<ProductProps>
}

const ProductList: React.FC<ProductListInterface> = ({ list }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-4 shadow-lg px-12 py-4 rounded-md">
        <div className="col-span-1">
          <h4 className="text-lg font-semibold">Product</h4>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-semibold">Price</h4>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-semibold">Quantity</h4>
        </div>
        <div className="col-span-1">
          <h4 className="text-lg font-semibold">Subtotal</h4>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {list.map((list, index) => (
          <Product key={index} {...list} />
        ))}
      </div>
    </Fragment>
  )
}

export default ProductList

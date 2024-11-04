import React, { Fragment } from 'react'
import { ProductProps } from './Item'
import Item from './Item'

interface ItemListInterface {
  list: Array<ProductProps>
}

const ItemList: React.FC<ItemListInterface> = ({ list }) => {
  return (
    <Fragment>
      <div className="flex flex-col space-y-4">
        {list.map((list, index) => (
          <Item key={index} {...list} />
        ))}
      </div>
    </Fragment>
  )
}

export default ItemList

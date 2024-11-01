import React from 'react'
import WishlistItem from './WishlistItem'

interface WishlistItemProps {
  id: number
  title: string
  price: number
  image: string
  discount: number
}

const WishlistList: React.FC<{
  data: WishlistItemProps[]
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-12">
      {data.map((item, index) => (
        <div key={index} className="col-span-3">
          <WishlistItem {...item} />
        </div>
      ))}
    </div>
  )
}

export default WishlistList

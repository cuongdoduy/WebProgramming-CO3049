import React from 'react'
import Product from '@/components/Product'

interface ForYouItemProps {
  id: number
  title: string
  price: number
  image: string
  discount: number
  rating: number
  reviews: number
}

const ForYouList: React.FC<{
  data: ForYouItemProps[]
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-12">
      {data.map((item, index) => (
        <div key={index} className="col-span-3">
          <Product {...item} />
        </div>
      ))}
    </div>
  )
}

export default ForYouList

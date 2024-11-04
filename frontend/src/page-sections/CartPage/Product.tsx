import { CartContext } from '@/contexts/CartContext'
import useDebounce from '@/hook/useDebounce'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

export interface ProductProps {
  title: string
  price: number
  image: string
  id: number
  quantity: number
}

const Product: React.FC<ProductProps> = ({
  title,
  price,
  image,
  quantity,
  id,
}) => {
  const [productQuantity, setProductQuantity] = useState<number>(quantity)

  const debounceValue: number = useDebounce(productQuantity, 500) as number

  const { updateItemInCart } = useContext(CartContext) || {
    updateItemInCart: () => {},
  }

  useEffect(() => {
    debounceValue &&
      updateItemInCart({
        id,
        title,
        price,
        image,
        quantity: debounceValue,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, id, title, price, image])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(parseInt(e.target.value))
  }

  return (
    <div className="grid grid-cols-4 gap-x-4 shadow-lg py-4 rounded-md items-center px-12">
      <div className="flex items-center col-span-1 py-4">
        <div className="w-[48px] mr-4">
          <Image
            src={image}
            alt={title}
            className="w-full h-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>

      <p className="text-sm text-gray-500 col-span-1">{price}</p>
      {/* <p className="text-sm text-gray-500 col-span-1">{quantity}</p> */}
      <input
        type="number"
        value={productQuantity}
        onChange={handleQuantityChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-w-[50px] w-fit max-w-[80px]"
        placeholder=""
        required
      />
      <p className="text-sm text-gray-500 col-span-1">{quantity * price}</p>
    </div>
  )
}

export default Product

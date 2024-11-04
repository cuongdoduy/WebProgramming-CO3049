import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface ProductImageListProps {
  productImages: Array<string | StaticImageData>
}

const ProductImageList: React.FC<ProductImageListProps> = ({
  productImages,
}) => {
  const [activeImage, setActiveImage] = React.useState(0)

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 grid grid-cols-1 gap-y-6">
        {productImages.map((image, index) => (
          <div
            className={`flex flex-col items-center px-4 py-8 h-auto bg-[#F5F5F5] rounded-[4px] cursor-pointer ${
              activeImage === index ? 'border-2 border-[#DB4444]' : ''
            }`}
            onClick={() => setActiveImage(index)}
            key={index}>
            <div className="mt-auto">
              <Image src={image} alt="Product Image" width={100} height={124} />
            </div>
          </div>
        ))}
      </div>
      {productImages.length > 0 && (
        <div className="col-span-9 flex items-center px-8 py-16 h-auto bg-[#F5F5F5] rounded-[4px]">
          <Image
            src={productImages[activeImage]}
            alt="Product Image"
            width={446}
            height={315}
          />
        </div>
      )}
    </div>
  )
}

export default ProductImageList

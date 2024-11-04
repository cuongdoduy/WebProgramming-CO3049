import React from 'react'
import Product from '@/components/Product'
import Slider from 'react-slick'

interface ForYouItemProps {
  id: number
  title: string
  price: number
  image: string
  discount: number
  rating: number
  reviews: number
}

const ProductSlider: React.FC<{
  data: ForYouItemProps[]
  sliderRef?: React.RefObject<Slider>
}> = ({ data, sliderRef }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1792,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  
  return (
    <div className="">
      <Slider {...settings} ref={sliderRef}>
        {data.map((item, index) => (
          <div key={index} className="">
            <div className="max-w-[270px]">
              <Product {...item} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductSlider

import React from 'react'
import Slider from 'react-slick'

import Employee from './Employee'
import { StaticImageData } from 'next/image'

interface EmployeeSliderProps {
  employees: {
    name: string
    position: string
    image: string | StaticImageData
    socials: {
      facebook: string
      twitter: string
      linkedin: string
    }
  }[]
}

const EmployeeSlider: React.FC<EmployeeSliderProps> = ({ employees }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1792,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
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
    <div className="ml-[-48px]">
      <Slider {...settings}>
        {employees.map((employee, index) => (
          <Employee key={index} {...employee} />
        ))}
      </Slider>
    </div>
  )
}

export default EmployeeSlider

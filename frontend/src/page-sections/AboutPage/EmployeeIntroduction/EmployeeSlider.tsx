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
    slidesToScroll: employees.length > 3 ? 3 : 1,
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

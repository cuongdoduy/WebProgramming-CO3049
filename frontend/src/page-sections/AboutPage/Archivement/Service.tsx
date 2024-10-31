import { Typography } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

interface AchivementItemProps {
  title: string
  description: string
  icon: string
}

const Service: React.FC<AchivementItemProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 text-center bg-white">
      <div className="w-[90px] h-[90px] rounded-[50%] bg-gray-400 relative">
        <div className="w-[60px] h-[60px] rounded-[50%] bg-black text-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%]">
            <Image src={icon} alt={title} width={64} height={64} />
          </div>
        </div>
      </div>
      <Typography as="h4" variant="h4" className="font-semibold text-[20px]">
        {title}
      </Typography>

      <Typography
        as="p"
        variant="paragraph"
        className="font-normal text-[18px]">
        {description}
      </Typography>
    </div>
  )
}

export default Service

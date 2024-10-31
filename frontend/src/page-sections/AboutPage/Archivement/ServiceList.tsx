import React from 'react'
import Service from './Service'

interface AchivementItemProps {
  title: string
  description: string
  icon: string
}

const ServiceList: React.FC<{
  data: AchivementItemProps[]
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-12">
      {data.map((item, index) => (
        <div key={index} className="col-span-4">
          <Service {...item} />
        </div>
      ))}
    </div>
  )
}

export default ServiceList

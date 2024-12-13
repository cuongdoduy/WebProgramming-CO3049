import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const CheckboxColors: React.FC = () => {
  return (
    <div className="flex w-full flex-wrap">
      <Checkbox
        crossOrigin={''}
        color="blue"
        className="rounded-full w-[37px] h-[37px] bg-blue-500"
      />
      <Checkbox
        crossOrigin={''}
        color="red"
        className="rounded-full w-[37px] h-[37px] bg-red-500"
      />
      <Checkbox
        crossOrigin={''}
        color="green"
        className="rounded-full w-[37px] h-[37px] bg-green-500"
      />
      <Checkbox
        crossOrigin={''}
        color="amber"
        className="rounded-full w-[37px] h-[37px] bg-amber-500"
      />
      <Checkbox
        crossOrigin={''}
        color="teal"
        className="rounded-full w-[37px] h-[37px] bg-teal-500"
      />
      <Checkbox
        crossOrigin={''}
        color="indigo"
        className="rounded-full w-[37px] h-[37px] bg-indigo-500"
      />
      <Checkbox
        crossOrigin={''}
        color="purple"
        className="rounded-full w-[37px] h-[37px] bg-purple-500"
      />
      <Checkbox
        crossOrigin={''}
        color="pink"
        className="rounded-full w-[37px] h-[37px] bg-pink-500"
      />
    </div>
  )
}

export default CheckboxColors

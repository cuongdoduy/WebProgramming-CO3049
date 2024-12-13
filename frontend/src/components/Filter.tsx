import React from 'react'
import Image from 'next/image'
import FilterIcon from 'public/filter.svg'
import CheckboxList from './CheckboxList'
import PriceSlider from './PriceSlider'
import PrimaryButton from './PrimaryButton'

const Filter = () => {
  const lists = [
    { name: 'All' },
    { name: 'T-Shirt' },
    { name: 'Shoes' },
    { name: 'Pants' },
  ]

  return (
    <div className="rounded-[20px] border-[1px] border-[#E6E6E6] p-[20px] mb-[40px] max-w-[360px]">
      <header className="flex items-center justify-between">
        <h4 className="text-[24px] font-bold">Filters</h4>
        <Image src={FilterIcon} alt="filter" width={24} height={24} />
      </header>
      <hr className="my-4" />
      <div className="mt-[20px]">
        <h2 className="text-[18px] font-bold">Category</h2>
        <CheckboxList lists={lists.map(item => item.name)} />
      </div>
      <hr className="my-4" />
      <div className="my-[20px] mb-[40px]">
        <h2 className="text-[18px] font-bold">Price</h2>
        <PriceSlider />
      </div>
      {/* <hr className="my-4" />
      <div className="mt-[20px]">
        <h2 className="text-[18px] font-bold">Sizes</h2>
        <SizeFilter />
      </div> */}
      <hr className="my-4" />
      <div className="mt-[20px]">
        <PrimaryButton title="Apply filter" className="!py-[12px] w-full" />
      </div>
    </div>
  )
}

export default Filter

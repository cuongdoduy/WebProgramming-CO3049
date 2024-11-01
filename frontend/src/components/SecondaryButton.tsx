import { Button } from '@material-tailwind/react'
import React from 'react'

interface SecondaryButtonProps {
  title: string
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title }) => {
  return (
    <Button className="bg-transparent rounded-[4px] w-[240px] py-[16px] px-[48px] w-fit border border-black text-black">
      {title}
    </Button>
  )
}

export default SecondaryButton

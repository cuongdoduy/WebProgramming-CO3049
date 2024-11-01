import { Button } from '@material-tailwind/react'
import React from 'react'

interface PrimaryButtonProps {
  title: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title }) => {
  return (
    <Button className="bg-[#DB4444] rounded-md min-w-[200px] py-4 w-auto px-2">
      {title}
    </Button>
  )
}

export default PrimaryButton

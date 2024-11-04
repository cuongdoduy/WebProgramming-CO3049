import { Button } from '@material-tailwind/react'
import React from 'react'

interface PrimaryButtonProps {
  title: string
  className?: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, className }) => {
  return (
    <Button className={`bg-[#DB4444] rounded-md min-w-[200px] p-2 w-auto ${className}`}>
      {title}
    </Button>
  )
}

export default PrimaryButton

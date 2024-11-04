import { useEffect, useState } from 'react'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date() // Set your target date here
    targetDate.setDate(targetDate.getDate() + 3) // Example: 3 days from now

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex space-x-2 text-center font-semibold text-xl">
      {Object.keys(timeLeft).map(unit => (
        <div key={unit} className="flex items-end space-x-1">
          <div className="flex flex-col items-center flex-col-reverse">
            <span className="text-[24px]">
              {timeLeft[unit as keyof typeof timeLeft].toString().padStart(2, '0')}
            </span>
            <span className="font-bold text-footnote">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
          <div>
            {unit !== 'seconds' && <span className='text-[#E07575]'>:</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Countdown

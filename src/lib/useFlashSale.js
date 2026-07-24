import { useEffect, useState } from 'react'
import { flashSaleDeadline } from '../data/packages'

const DEADLINE = new Date(flashSaleDeadline).getTime()

function msLeft() {
  return Math.max(0, DEADLINE - Date.now())
}

// Dùng chung cho FlashSalePopup, Packages và RegisterForm — tránh mỗi nơi tự tính giờ lệch nhau.
export function useFlashSale() {
  const [remaining, setRemaining] = useState(msLeft())

  useEffect(() => {
    const id = setInterval(() => setRemaining(msLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const totalSeconds = Math.floor(remaining / 1000)
  return {
    active: remaining > 0,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

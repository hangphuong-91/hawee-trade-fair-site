import { useEffect, useState } from 'react'
import { earlyBirdDeadline } from '../data/packages'

const DEADLINE = new Date(earlyBirdDeadline).getTime()

function isActive() {
  return Date.now() < DEADLINE
}

// Dùng chung cho Packages và RegisterForm — sau mốc 31/7, giá tự động rơi về standard.
export function useEarlyBird() {
  const [active, setActive] = useState(isActive())

  useEffect(() => {
    const id = setInterval(() => setActive(isActive()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  return active
}

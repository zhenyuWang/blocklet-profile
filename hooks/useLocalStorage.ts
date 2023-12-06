'use client'
import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : JSON.parse(initialValue)
    }
    return JSON.parse(initialValue)
  })

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage

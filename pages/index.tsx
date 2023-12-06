import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('/profile')
  }, [])

  return null
}
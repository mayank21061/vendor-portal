import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const checkRefreshToken = localStorage.getItem('refresh_token')
    if (checkRefreshToken || navigator.onLine === false) {
      setLoading(false)
      router.push('/dashboard')
    } else {
      setLoading(false)
      router.push('/login')
    }

    // console.log('check status ', navigator.onLine)
  }, [])

  return <div>{loading && 'Loading...'}</div>
}

export default Home

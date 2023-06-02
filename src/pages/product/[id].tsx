import React from 'react'
import { useRouter } from 'next/router'
const product = () => {
  const { query } = useRouter()
  return (
    <div>product </div>
  )
}

export default product
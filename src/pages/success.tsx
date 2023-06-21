import { ImageContainer, SuccessContainer } from '@/styles/pages/success'
import Link from 'next/link'
import React from 'react'

const success = () => {
  return (
    <SuccessContainer>
      <h1>Thanks for your order!👌</h1>

      <ImageContainer>

      </ImageContainer>

      <p>Uhuul <strong>Junior</strong>, your <strong>Camiseta</strong> is on the way!</p>

      <Link href={'/'}>
        Back to the shop
      </Link>
    </SuccessContainer>
  )
}

export default success
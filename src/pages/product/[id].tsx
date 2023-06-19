import React from 'react'
import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
const product = () => {
  const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>camsieta</h1>

        <span>78.00</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, at?</p>

        <button>Buy Now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export default product
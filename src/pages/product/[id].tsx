import React from 'react'

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'

interface ProductProps{
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

const product = ({product} : ProductProps) => {

  return (
    <ProductContainer>
      <ImageContainer>
        <Image  width={520} height={480} alt='' src={product.imageUrl}/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Buy Now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export default product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
     
    ],
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {

  const prductId = params.id

  const product = await stripe.products.retrieve(prductId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;
  
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(price.unit_amount / 100),
        description: product.description,
      }
    },
    revalidate: 60 * 60 * 1
  }
}
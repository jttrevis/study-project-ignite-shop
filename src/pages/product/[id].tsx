import React, { useState } from 'react'

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import axios from 'axios'
import Head from 'next/head'

interface ProductProps{
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

const Product = ({product} : ProductProps) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct(){
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Error processing purchase request from stripe: ' + error)
      setIsCreatingCheckoutSession(false)

    }
    
  }

  return (
    <>
    <Head>
        <title>{product.name}</title>
    </Head>
    <ProductContainer>
      <ImageContainer>
        <Image  width={520} height={480} alt='' src={product.imageUrl}/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Buy Now</button>
      </ProductDetails>
    </ProductContainer>
    </>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
     
    ],
    fallback: 'blocking'
  }
}
export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }
  const prductId = params?.id

  const product = await stripe.products.retrieve(prductId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;
  const unitAmount = price.unit_amount ?? 0;
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(unitAmount/ 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1
  }
}
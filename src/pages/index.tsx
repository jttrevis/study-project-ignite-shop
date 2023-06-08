import { styled } from "@/styles"
import { HomeContainer, Product } from "@/styles/pages/home"
import camiseta1 from '@/assets/product1.png'
import camiseta2 from '@/assets/product2.png'
import camiseta3 from '@/assets/product3.png'
import Image from "next/image"

const Button = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 8,
  border: 0,
  padding: '4px 8px',

  '&:hover': {
    filter: 'brightness(0.8)'
  },

  span: {
    fontWeight: 'bold',
    color: '$white'
  },


})


export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image alt="shirt" width={520}  height={480} src={camiseta1}/>
        <footer>
          <strong>Camiseta X</strong>
          <span>$ 79.90</span>
        </footer>
      </Product>

      <Product>
        <Image alt="shirt" width={520}  height={480} src={camiseta2}/>
        <footer>
          <strong>Camiseta X</strong>
          <span>$ 79.90</span>
        </footer>
      </Product>

      
    </HomeContainer>
  )
}

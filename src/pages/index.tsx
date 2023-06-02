import { styled } from "@/styles"

const Button = styled('button', {
  backgroundColor: '$black',
  borderRadius: 8,
  border: 0,
  padding: '4px 8px',

  '&:hover': {
    filter: 'brightness(0.8)'
  },

  span: {
    fontWeight: 'bold',
    color: 'White'
  },


})


export default function Home() {
  return (
    <>
      <h1>hello</h1>
      <Button><span>OLA</span></Button>
    </>
  )
}

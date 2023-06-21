import { styled } from "@/styles";
import { HomeContainer, Product } from "@/styles/pages/home";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";

const Button = styled("button", {
  backgroundColor: "$green500",
  borderRadius: 8,
  border: 0,
  padding: "4px 8px",

  "&:hover": {
    filter: "brightness(0.8)",
  },

  span: {
    fontWeight: "bold",
    color: "$white",
  },
});

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  alt="shirt"
                  width={520}
                  height={480}
                  src={product.imageUrl}
                />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    const unitAmount = price.unit_amount ?? 0;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(unitAmount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 12,
  };
};

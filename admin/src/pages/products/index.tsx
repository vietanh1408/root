import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";

export interface ProductListPageProps {
  products: any[];
  pagination: any;
}

const Products = (props: ProductListPageProps) => {
  const { products } = props;
  console.log("📢[index.tsx:11]: ", products);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product: any, index) => (
          <li key={index}>
            <Link href={`/products/${product.id}`} passHref={true}>
              <p>{product.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Products.defaultProps = {
  protected: true,
};

export default Products;

export const getStaticProps: GetStaticProps<ProductListPageProps> = async (
  _context: GetStaticPropsContext
) => {
  // This function run in server side

  // using fetch
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    props: {
      products: data.data,
      pagination: data.pagination,
    },
  };
};

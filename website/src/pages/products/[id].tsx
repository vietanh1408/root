import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

export interface ProductDetailPageProps {
  post: any;
}

const ProductDetail: React.FC<ProductDetailPageProps> = ({
  post,
}: ProductDetailPageProps) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <h1>Author: {post.author}</h1>

      <h2>Title: {post.title}</h2>

      <p>
        <strong>Description:</strong> {post.description}
      </p>

      <img src={post.imageUrl} alt={post.description} />
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    paths: data.data.map((product: any) => ({
      params: {
        id: product.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  // This function run in server side

  const id = context.params?.id;

  if (!id) return { notFound: true };

  // using fetch
  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${id}`
  );
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
};

// src/components/Product/RelatedProduct.tsx
import React from 'react';
import ProductInfo from '../Product/ProductInfo';

interface RelatedProducted {
  relatedProducts: {
    id: number;
    title: string;
    price: number;
    image: string;
    discount: number;
  }[];
}

const RelatedProduct: React.FC<RelatedProducted> = ({ relatedProducts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {relatedProducts.map((product) => (
       <ProductInfo
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          discount={product.discount} colors={[]} sizes={[]}     />     
      ))}
    </div>
  );
};

export default RelatedProduct;

import React from 'react';

interface ProductIDProps {
  id: number;
}

const ProductID: React.FC<ProductIDProps> = ({ id }) => {
  return <p>Product ID: {id}</p>;
};

export default ProductID;

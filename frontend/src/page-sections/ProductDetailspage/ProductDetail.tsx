// src/pages/ProductDetail.tsx
import React from 'react';
import ProductInfo from '../../components/Product/ProductInfo';
import ProductID from '../../components/Product/ProductID';
import ProductGallery from '../../components/Product/ProductGallery';
import RelatedProduct from '../../components/Product/RelatedProduct';

const ProductDetail: React.FC = () => {
  const product = {
    id: 1,
    title: 'Havic HV G-92 Gamepad',
    price: 192.00,
    discount: 0,
    images: ['../../../public/images/havic-1.png', '../../../public/images/havic-2.png', '../../../public/images/havic-3.png'],
    colors: ['#FF0000', '#00FF00', '#0000FF'], 
    sizes: ['S', 'M', 'L'],
    relatedProducts: [
      { id: 2, title: 'Havit HC Gamepad', price: 200, image: '../../../public/images/gamepad.png', discount: 30 },
      { id: 3, title: 'RGB Lipid CPU Cooler', price: 180, image: '../../../public/images/rgb.png', discount: 15 },
      { id: 4, title: 'SCREEN LED LCD', price: 400, image: '../../../public/images/Icd_monitor.png', discount: 20 },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <ProductGallery images={product.images} />
      <ProductInfo title={product.title} price={product.price} discount={product.discount} id={0} image={''} colors={[]} sizes={[]} />
      <ProductID id={product.id} />
      <h2 className="text-xl font-bold mt-8">Related Items</h2>
      <RelatedProduct relatedProducts={product.relatedProducts} />
    </div>
  );
};

export default ProductDetail;

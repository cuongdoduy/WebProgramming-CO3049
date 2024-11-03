import React from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  return (
    <div className="flex space-x-4">
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Product image ${index + 1}`} width={100} height={100} />
      ))}
    </div>
  );
};

export default ProductGallery;

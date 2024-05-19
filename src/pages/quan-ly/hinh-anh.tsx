import { useState } from 'react';
import { Gallery } from 'react-grid-gallery';

export default function Images() {
  const [images, setImages] = useState(IMAGES);
  const hasSelected = images.some((image: any) => image.isSelected);

  const handleSelect = (index: number) => {
    const nextImages = images.map((image: any, i: number) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setImages(nextImages);
  };

  const handleSelectAllClick = () => {
    const nextImages = images.map((image: any) => ({
      ...image,
      isSelected: !hasSelected,
    }));
    setImages(nextImages);
  };

  return (
    <div>
      <div className='p-t-1 p-b-1'>
        <button onClick={handleSelectAllClick}>
          {hasSelected ? 'Clear selection' : 'Select all'}
        </button>
      </div>
      <Gallery images={images} onSelect={handleSelect} />
    </div>
  );
}

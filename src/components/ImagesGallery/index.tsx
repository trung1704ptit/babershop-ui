/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';

export interface IGallery {
  id: string;
  name: string;
  images: string[];
  created_at: string;
  updated_at: string;
}

interface IProps {
  galleries: IGallery[];
}

export default function ImagesGallery(props: IProps) {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    if (props?.galleries && props?.galleries.length) {
      const imagesFormated = props?.galleries[0]?.images.map((img) => ({
        src: img.includes('uploads/')
          ? `${process.env.NEXT_PUBLIC_APP_API_PATH}/api/${img}`
          : img,
      }));
      setImages(imagesFormated);
    }
  }, [props.galleries]);

  const handleClick = (index: number) => {
    setIndex(index);
  };

  return (
    <div className='container mt-4 mb-4'>
      <div className='section_heading text-center mb-40' data-wow-delay='300ms'>
        <h2>Thư viện ảnh</h2>
        <div className='heading-line' />
      </div>
      <ImageList variant='masonry' cols={5} gap={8}>
        {images.map((item: any, index: number) => (
          <ImageListItem key={item.image_url}>
            <img
              srcSet={item.src}
              src={item.src}
              alt={item.name}
              loading='lazy'
              onClick={() => handleClick(index)}
              className='cursor-pointer'
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Lightbox
        index={index}
        slides={images}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </div>
  );
}

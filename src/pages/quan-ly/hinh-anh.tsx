/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Add, CloudUpload } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IGallery } from '../../components/ImagesGallery';
import Layout from '../../components/Layout';
import api from '../../utils/api';

interface ImageInput {
  id: number;
  file: File | undefined;
  img: string;
  imgOriginUrl: string;
}

const DynamicImageUpload = () => {
  const [gallery, setGallery] = useState<IGallery>();
  const [inputs, setInputs] = useState<ImageInput[]>([
    { id: Date.now(), file: undefined, img: '', imgOriginUrl: '' },
  ]);

  const handleAddField = () => {
    setInputs([
      ...inputs,
      { id: Date.now(), file: undefined, img: '', imgOriginUrl: '' },
    ]);
  };

  const handleRemoveField = (id: number) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleFileChange = (id: number, file: File | undefined) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, file, img: '' } : input
      )
    );
  };

  const queryGallery = async () => {
    try {
      const res = await api.get('/api/galleries');
      if (res && res.status === 200) {
        const result = res.data.data[0];
        setGallery(res.data.data[0]);
        setInputs(
          result.images.map((img: string, index: number) => {
            return {
              id: Date.now() + index,
              img: img.includes('uploads/')
                ? `${process.env.NEXT_PUBLIC_APP_API_PATH}/api/${img}`
                : img,
              imgOriginUrl: img,
              file: undefined,
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryGallery();
  }, []);

  const handleUpload = async () => {
    const newImages = inputs.map((input) => input.img);
    inputs.forEach(async (input, index: number) => {
      newImages[index] = input.imgOriginUrl;
      if (input.file) {
        const formFile = new FormData();
        formFile.append('file', input.file);
        try {
          const res = await api.post('api/files/single', formFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (res && res.status == 200) {
            console.log('res.data.data:', res.data.data);
            newImages[index] = res.data.data.filePath;
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    setTimeout(async () => {
      if (gallery) {
        try {
          await api.put(`/api/galleries/${gallery.id}`, {
            images: newImages,
          });
          toast.success('Lưu thành công', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await api.post('/api/galleries', {
            images: newImages,
          });
          toast.success('Lưu thành công', {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
          });
        } catch (err) {
          console.log(err);
        }
      }
      queryGallery();
    }, 3000);
  };

  return (
    <Layout>
      <Typography variant='h5' gutterBottom>
        Thư viện ảnh
      </Typography>
      <div>
        {inputs?.map((input) => (
          <Grid container spacing={2} key={input.id} alignItems='center'>
            <Grid item xs={8} display='flex' gap={2} mb={2}>
              <TextField
                type='file'
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(
                    input.id,
                    e.target?.files ? e.target?.files[0] : undefined
                  )
                }
              />

              {input?.img && <img src={input?.img} width={80} />}

              {input.file && (
                <img src={URL.createObjectURL(input.file)} width={80} />
              )}
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleRemoveField(input.id)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </div>

      <Button
        variant='contained'
        size='small'
        startIcon={<Add />}
        onClick={handleAddField}
        style={{ marginTop: '20px' }}
      >
        Thêm ảnh
      </Button>
      <Button
        variant='contained'
        size='small'
        startIcon={<CloudUpload />}
        onClick={handleUpload}
        style={{ marginTop: '20px', marginLeft: '20px' }}
      >
        Lưu lại
      </Button>
    </Layout>
  );
};

export default DynamicImageUpload;

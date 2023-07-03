import { encode } from 'blurhash';

const MAX_SIZE = 500;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.width > MAX_SIZE || img.height > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / img.width, MAX_SIZE / img.height);
        img.width *= ratio;
        img.height *= ratio;
      }
      resolve(img);
    };
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0);
  return context?.getImageData(0, 0, image.width, image.height);
};

export const useBlurhash = async (imageUrl: string) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  if (!imageData) return;
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};

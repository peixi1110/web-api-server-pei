export const getCroppedImg = async (imageSrc, crop, zoom) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Wait for image to load
    await new Promise((resolve) => {
      image.onload = resolve;
    });
  
    const { width, height } = image;
    const cropWidth = width * zoom;
    const cropHeight = height * zoom;
  
    canvas.width = cropWidth;
    canvas.height = cropHeight;
  
    ctx.drawImage(
      image,
      crop.x * zoom,
      crop.y * zoom,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(new File([blob], 'cropped-image.png', { type: 'image/png' }));
      }, 'image/png');
    });
  };
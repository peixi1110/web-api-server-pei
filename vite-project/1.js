import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, Button, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getCroppedImg } from './cropUtils'; // Utility function for cropping image

const ImageCropUpload = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileList, setFileList] = useState([]);

  const handleImageUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const handleCrop = async () => {
    const croppedImg = await getCroppedImg(image, crop, zoom);
    setCroppedImage(croppedImg);
    setShowCropper(false);
  };

  const handleUpload = async () => {
    if (!croppedImage) return;

    const formData = new FormData();
    formData.append('file', croppedImage);

    // Replace with your API endpoint
    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setFileList([...fileList, { uid: Date.now(), name: 'cropped-image.jpg', status: 'done' }]);
  };

  const uploadProps = {
    customRequest: handleImageUpload,
    fileList,
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>

      <Modal visible={showCropper} footer={null} onCancel={() => setShowCropper(false)}>
        {image && (
          <div>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
            <Button onClick={handleCrop}>Crop Image</Button>
          </div>
        )}
      </Modal>

      {croppedImage && (
        <div>
          <img src={URL.createObjectURL(croppedImage)} alt="Cropped" />
          <Button onClick={handleUpload}>Upload Cropped Image</Button>
        </div>
      )}
    </div>
  );
};

export default ImageCropUpload;

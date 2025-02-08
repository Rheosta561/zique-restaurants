import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AmbienceGallery() {
  const [images, setImages] = useState([]); 
  const [files, setFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); 
  const { userId } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://zique-restaurants-portal.onrender.com/find/${userId}`);
        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
          setImages(data.restaurant.ambience || []); // Load ambience images from backend
        } else {
          console.error('Failed to fetch images:', data.message);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId]);

  const handleImageUpload = (event) => {
    const filesArray = Array.from(event.target.files);
    const previewImages = filesArray.map(file => URL.createObjectURL(file));

    setImages(prevImages => [...prevImages, ...previewImages]);
    setFiles(prevFiles => [...prevFiles, ...filesArray]);
  };

  const toggleImageSelection = (index) => {
    setSelectedImages(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index)
        : [...prevSelected, index]
    );
  };

  const removeSelectedImages = async () => {
    if (selectedImages.length === 0) {
      alert("No images selected for deletion!");
      return;
    }

    const imagesToDelete = selectedImages.map(index => images[index]);
    const remainingImages = images.filter((_, i) => !selectedImages.includes(i) || images[i].startsWith('blob:'));

    if (imagesToDelete.every(url => url.startsWith('blob:'))) {
      setImages(remainingImages);
      setFiles(prevFiles => prevFiles.filter((_, i) => !selectedImages.includes(i + (images.length - files.length))));
      setSelectedImages([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/delete/ambience/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrls: imagesToDelete }),
      });

      const data = await response.json();

      if (response.ok) {
        setImages(data.images);
        setSelectedImages([]); 
        alert(`${selectedImages.length} images deleted successfully!`);
      } else {
        alert(`Failed to delete images: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
    }
  };

  const handleSave = async () => {
    if (images.length === 0) {
      alert('No images to save.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const uploadResponse = await fetch(`http://localhost:3000/ambienceGallery/upload/${userId}`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        alert(`Upload failed: ${uploadData.message}`);
        setLoading(false);
        return;
      }

      const updatedImages = [
        ...images.filter(img => !img.startsWith('blob:')),
        ...uploadData.images
      ];

      const updateResponse = await fetch(`http://localhost:3000/ambienceGallery/update/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: updatedImages }),
      });

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        alert(`Update failed: ${updateData.message}`);
        setLoading(false);
        return;
      }

      setImages(updateData.images);
      setFiles([]);

      alert('Images updated successfully!');
    } catch (error) {
      console.error('Error updating images:', error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Ambience Gallery</h1>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Ambience ${index}`} className="w-full h-32 object-cover rounded-lg" />
            <button
              onClick={() => toggleImageSelection(index)}
              className={`absolute top-2 right-2 ${
                selectedImages.includes(index) ? 'bg-green-500' : 'bg-red-500'
              } text-white rounded-full w-6 h-6 flex items-center justify-center`}>
              {selectedImages.includes(index) ? '✓' : '×'}
            </button>
          </div>
        ))}
      </div>

      {selectedImages.length > 0 && (
        <div className="mt-4 p-4 border rounded-lg bg-red-100">
          <p className="text-red-700 font-semibold">
            {selectedImages.length} images selected for deletion
          </p>
          <button
            onClick={removeSelectedImages}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg">
            Delete Selected
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        <input type="file" multiple onChange={handleImageUpload} className="hidden" id="fileInput" />
        <button
          onClick={() => document.getElementById('fileInput').click()}
          className="p-2 bg-gray-800 text-white rounded-lg">
          Add New
        </button>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className={`p-2 bg-zinc-800 text-white rounded-lg ${loading ? 'opacity-50' : ''}`}>
          {loading ? 'Uploading...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default AmbienceGallery;

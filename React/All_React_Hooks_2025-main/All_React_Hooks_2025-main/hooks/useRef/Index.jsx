import React, { useRef, useState } from "react";

const Index = () => {
  const imageRef = useRef(null);

  const [isFirstImage, setisFirstImage] = useState(true);

  const handleImageChange = () => {
    if (imageRef.current) {
      imageRef.current.src = isFirstImage
        ? "https://cdn.pixabay.com/photo/2025/02/26/09/50/river-9432587_640.jpg"
        : "https://cdn.pixabay.com/photo/2025/02/22/16/06/mountain-9424297_640.jpg";

      setisFirstImage(!isFirstImage);
    }
  };

  return (
    <div>
      <h1>Change Image Using UseRef</h1>

      <img
        ref={imageRef}
        src="https://cdn.pixabay.com/photo/2025/02/22/08/35/mountain-9423779_640.jpg"
        alt=""
      />

      <button onClick={handleImageChange}>Change Image</button>
    </div>
  );
};

export default Index;

'use client'

import React, { useState, useRef } from 'react';
interface PausableGifProps {
  src: string;
  alt: string;
}

const PausableGif: React.FC<PausableGifProps> = ({ src, alt }) => {
  const [isPaused, setIsPaused] = useState(false);
  const imgRef = useRef(null);

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (imgRef.current) {
      if (isPaused) {
        imgRef.current.src = imgRef.current.src;
      } else {
        const src = imgRef.current.src;
        imgRef.current.src = '';
        imgRef.current.src = src;
      }
    }
  };

  return (
    <div className="relative inline-block">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full md:w-1/2 h-auto rounded-lg shadow-md cursor-pointer"
        onClick={togglePause}
      />
      <button
        className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
        onClick={togglePause}
      >
        {isPaused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
};

export default PausableGif;
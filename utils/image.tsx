import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Image: React.FC<ImageProps> = (props) => {
  return <img src={props.src} alt={props.alt} width={props.width} height={props.height} />;
};

export default Image;
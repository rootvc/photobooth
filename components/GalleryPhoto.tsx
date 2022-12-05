import React from 'react'
import Image from 'next/image'

import styles from '@styles/GalleryPhoto.module.css'

interface GalleryPhotoProps {
  url: string;
  index: number;
}

const GalleryPhoto = (props: GalleryPhotoProps) => {
  return (
    <li className={styles.galleryPhoto}>
      <Image alt="Extremely cool AI generated image" src={props.url} height={512} width={512} priority={props.index < 2} />
    </li>
  )
};

export default GalleryPhoto;
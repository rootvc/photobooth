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
      <Image
        src={props.url}
        alt="Extremely cool AI generated image"
        height={512}
        width={512}
        priority={props.index < 2}
      />
    </li>
  )
};

export default GalleryPhoto;

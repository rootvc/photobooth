import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import GalleryPhoto from '@components/GalleryPhoto'

import styles from '@styles/Gallery.module.css'

const isIndexPage = (token: string | null) => !token || token === "index.html";

export default function Gallery() {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState<string[] | null>([]);
  const token: string | null = router.query.token ? router.query.token[0] : null;

  useEffect(() => {
    fetch("/api/fetchS3Urls")
      .then(res => res.json())
      .then(res => {
        const allUrls = res.urls;

        if (isIndexPage(token)) { // index page
          setPhotoUrls(allUrls.reverse());
        } else { // individual token page
          const tokenIndex = allUrls[0].split("/").length - 2; // this is the same for every url and can be done once
          const matchedUrls = allUrls.filter((u: string) => u.split("/")[tokenIndex] == token);
          setPhotoUrls(matchedUrls);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <Head>
        <title>Root Ventures Photobooth</title>
      </Head>

      <h1 className={styles.galleryHeader}>{!isIndexPage(token) && `$${token}:`}gallery &gt;_</h1>

      <ul className={styles.gallery}>
        {photoUrls!.map((url, index) =>
          <GalleryPhoto key={index} url={url} index={index} />
        )}
      </ul>
    </>
  );
}

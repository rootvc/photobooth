import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import GalleryPhoto from '@components/GalleryPhoto'

import styles from '@styles/Gallery.module.css'

export default function GalleryByToken() {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState<string[] | null>([]);
  const { token } = router.query;

  useEffect(() => {
    fetch("/api/fetchS3Urls")
      .then(res => res.json())
      .then(res => {
        const allUrls = res.urls;

        if (!token || token[0] === "index.html") { // index page
          setPhotoUrls(allUrls);
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

      <h1 className={styles.galleryHeader}>{token && token[0] !== "index.html" && `$${token}:`}gallery &gt;_</h1>

      <ul className={styles.gallery}>
        {photoUrls!.map((url, index) =>
          <GalleryPhoto key={index} url={url} index={index} />
        )}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/fetchS3Urls`);
  const urls = await res.json();

  return {
    props: {
      urls,
    },
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

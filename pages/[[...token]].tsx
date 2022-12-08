import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AWS from 'aws-sdk'

import GalleryPhoto from '@components/GalleryPhoto'
import styles from '@styles/Gallery.module.css'

AWS.config.region = process.env.NEXT_PUBLIC_AWS_REGION!;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: process.env.NEXT_PUBLIC_AWS_ID_POOL! });

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET!;
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: bucketName }
});

const isIndexPage = (token: string | null) => !token || token === "index.html";

export default function Gallery() {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState<string[] | null>([]);
  const [token, setToken] = useState<string | null>([]);

  useEffect(() => {
    if (router.isReady) {
      console.log("SETTING TOKEN", router.query.token ? router.query.token[0] : "(undefined)");
      setToken(router.query.token ? router.query.token[0] : null);
    }
  }, [router.query.token]);

  useEffect(() => {
    if (router.isReady && token) {
      function fetchPhotos(prefix: string) {
        const objs = s3.listObjects({ Bucket: bucketName, Prefix: prefix }, function(err, data) {
          if (err) {
            return alert('There was an error viewing your album: ' + err.message);
          }
          // 'this' references the AWS.Request instance that represents the response
          // @ts-ignore eslint-disable-next-line @typescript-eslint/ban-ts-comment
          var href = this.request.httpRequest.endpoint.href;
          var bucketUrl = href + bucketName + '/';
          var photos = data.Contents!.map((photo) => `${bucketUrl}${photo.Key!}`);

          if (isIndexPage(token)) {
            photos = photos.reverse();
          }

          photos = photos.filter(p => {  // filter out root bucket/prefix urls
            const filenameInParts = p.split(".");
            return filenameInParts[filenameInParts.length - 1] == "png"
          });

          setPhotoUrls(photos);
        });

        return objs;
      }

      fetchPhotos("output/" + token);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Root Ventures Photobooth</title>
      </Head>

      <h1 className={styles.galleryHeader}>{!isIndexPage(token) && "$guest"}:gallery &gt;_</h1>

      <ul className={styles.gallery}>
        {photoUrls && photoUrls.length > 0 && photoUrls.map((url, index) =>
          <GalleryPhoto key={index} url={url} index={index} />
        )}
      </ul>
    </>
  );
}

import React, { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

let img: HTMLImageElement,
  video: HTMLVideoElement,
  screenshot: HTMLButtonElement,
  downloadTag: HTMLAnchorElement,
  idField: HTMLInputElement,
  canvas: HTMLCanvasElement;
let enable = false;

const init = () => {
  canvas = document.createElement('canvas');

  enableCamera();

  if (enable) {
    idField = document.getElementById('id')!;
    screenshot = document.getElementById('screenshot')!;
    img = document.getElementsByTagName('img')[0]!;
    video = document.getElementsByTagName('video')[0]!;

    screenshot.addEventListener('click', takeScreenshot);
  }

  startCamera();
}

const enableCamera = () => {
  if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
    alert("Unable to enable camera. That's bad. This is broken and won't work.");
  } else {
    enable = true;
  }
}

const startCamera = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream
      screenshot.disabled = false;
    })
    .catch(err => alert('Error occurred: ' + err));
}

const takeScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0);
  img.src = canvas.toDataURL('image/jpg');
  img.style.display = 'block'

  downloadScreenshot(); // TODO: Send to S3 instead!
}

const downloadScreenshot = () => {
  let id = idField.value.replace(/[^a-z0-9]/gi, '');

  downloadTag = document.createElement('a');
  downloadTag.href = img.src;
  downloadTag.download = `${id}.jpg`;
  downloadTag.style.display = 'none';

  document.body.appendChild(downloadTag);
  downloadTag.click();
  document.body.removeChild(downloadTag);
};

const reset = () => {
  // clear input field
}

export default function Home() {
  useEffect(() => {
    init();
  });

  return (
    <>
      <Head>
        <title>Root Ventures Photobooth</title>
      </Head>

      <div className="container">
        <video autoPlay />
        <h2 className={styles.countdown} style={{ display: 'none' }}>3</h2>
        <input id="id" className={styles.identifier} placeholder="your email (required)" />
        <button id="screenshot">Ready!</button>

        <div className="imgContainer" style={{ display: 'none' }}>
          <Image src="/" alt="placeholder" height={512} width={512} />
        </div>
      </div>
    </>
  );
}

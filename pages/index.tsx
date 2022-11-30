import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Root Ventures Photobooth</title>
      </Head>

      <div className="container">
        <video autoPlay />
        <div>
          <button id="screenshot">Snap!</button>
        </div>
        <div className="imgContainer" style={{ display: 'none' }}>
          <img src="" />
        </div>
      </div>
    </>
  );
}

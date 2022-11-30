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
        <h2 className={styles.countdown} style={{ display: 'none' }}>3</h2>
        <input id="id" className={styles.identifier} placeholder="your email (required)" />
        <button id="screenshot">Ready!</button>

        <div className="imgContainer" style={{ display: 'none' }}>
          <img src="" />
        </div>
      </div>
    </>
  );
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <script src="video.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

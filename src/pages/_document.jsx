import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon for the browser tab */}
        <link rel="icon" type="image/jpeg" href="/favicon.JPG" />
        <meta name="description" content="Advertio - Premium marketing agency creating cinematic 3D digital experiences." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

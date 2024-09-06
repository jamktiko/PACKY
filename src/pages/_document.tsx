/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      {/* Head can later be inserted to each page for page-related meta */}
      <Head>
        <title>Tech Stack Consultation | PACKY</title>
        <meta
          name='description'
          content='PACKY is a web app that offers tech stack suggestions and solutions for app developers.'
        />
        <meta
          name='keywords'
          content='tech consultation, expert advice, productivity tool'
        />
        <meta name='category' content='Productivity, Business, Education' />
        <link rel='icon' href='/favicon.png' sizes='any' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

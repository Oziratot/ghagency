import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ssrBodyClassSet } from '../utils/hooks/usePageClass';

class Document extends NextDocument {
  // static async getInitialProps(ctx) {
  //   const initialProps = await NextDocument.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    const bodyClassList = [...ssrBodyClassSet.values()];

    return (
      <Html lang="ru" prefix="og: https://ogp.me/ns#">
        <Head />
        <body className={bodyClassList.join(' ')}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

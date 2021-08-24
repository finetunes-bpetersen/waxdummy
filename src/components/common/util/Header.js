import React from 'react'
import Head from "next/dist/next-server/lib/head";

export default function Header(
    { children, title, ogTitle, ogDescription, ogImage, pageImage, twitterTitle, twitterDescription, twitterImage }
) {

  return (
    <Head>
        <title>{title}</title>
        <meta id="og-title" property="og:title" content={ogTitle} />
        <meta id="og-description" property="og:description" content={ogDescription} />
        <meta id="og-image" property="og:image" content={ogImage} />
        <link id='page-image' rel="apple-touch-icon" href={pageImage} />
        <meta id="twitter-title" property="twitter:title" content={twitterTitle} />
        <meta id="twitter-description" property="twitter:description" content={twitterDescription} />
        <meta id="twitter-image" property="twitter:image" content={twitterImage} />
        <meta name="msapplication-TileColor" content="#1235ba" />
        <meta name="theme-color" content="#1A1A1A" />
        {children}
    </Head>
  )
}
import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/styles.css'
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next.js + MongoDB App</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

import Head from 'next/head';

const TheHead = () => {

    return (
        <Head>
        <title>myLevel</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="myLevel is an app to help you read Chinese at your level."
        />
        <meta property="og:title" content="myLevel" />
        <meta
          property="og:description"
          content="myLevel is an app to help you read Chinese at your level."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
    )


}

export default TheHead
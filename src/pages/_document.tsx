import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link rel="short icon" href="favicon.png" type="image/png" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />

                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>

            </Html>
        );
    }
}
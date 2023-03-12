import type { AppProps } from "next/app";
import Head from "next/head";
import { Chakra } from "components/Chakra";
import Layout from "lib/layout";
import "lib/styles/globals.css";
import { SWRConfig } from "swr/_internal";
import fetcher from "lib/fetcher";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig value={{ fetcher: fetcher }}>
            <Chakra>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Chakra>
        </SWRConfig>
    );
};

export default MyApp;

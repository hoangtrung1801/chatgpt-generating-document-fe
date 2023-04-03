import { Chakra } from "components/Chakra";
import { fetchWithCredentials } from "lib/fetcher";
import useCurrentUser from "lib/hooks/useCurrentUser";
import Layout from "lib/layout";
import "lib/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr/_internal";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { asPath, replace } = useRouter();

    const {
        currentUser,
        isLoading: isCurrentUserLoading,
        error,
    } = useCurrentUser();

    useEffect(() => {
        if (!currentUser && asPath !== "/login" && asPath !== "/signup") {
            replace("/login");
        }
    }, [asPath, currentUser, isCurrentUserLoading, replace]);

    return (
        <SWRConfig value={{ fetcher: fetchWithCredentials }}>
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

import { Chakra } from "components/Chakra";
import { fetchWithCredentials } from "lib/fetcher";
import useCurrentUser from "lib/hooks/useCurrentUser";
import Layout from "lib/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr/_internal";
import Script from "next/script";
import "../lib/global.css";
import { GlobalLoading } from "components/loading/index";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { asPath, replace } = useRouter();
    const route = useRouter();

    const {
        currentUser,
        isLoading: isCurrentUserLoading,
        error,
    } = useCurrentUser();

    useEffect(() => {
        if (isCurrentUserLoading) return;
        if (!currentUser && asPath !== "/login" && asPath !== "/signup") {
            console.log("ok");
            replace("/login");
        }
    }, [asPath, currentUser, isCurrentUserLoading, replace]);

    useEffect(() => {
        console.log({ currentUser });
    }, [currentUser]);

    return (
        <SWRConfig value={{ fetcher: fetchWithCredentials }}>
            <Chakra>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
                <Component {...pageProps} />
                <GlobalLoading />
            </Chakra>
        </SWRConfig>
    );
};

export default MyApp;

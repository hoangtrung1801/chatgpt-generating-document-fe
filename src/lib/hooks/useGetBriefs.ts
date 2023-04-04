import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/chatgpt/briefs`;

const useBriefs = () => {
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        briefs: data === undefined ? undefined : data.data,
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useBriefs;

import { BE_URL } from "lib/config";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/chatgpt/briefs`;

const useBriefs = () => {
    const { data, error }: SWRResponse = useSwr(API_URL);

    return {
        briefs: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useBriefs;

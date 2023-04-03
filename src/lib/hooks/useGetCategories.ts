import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/categories`;

const useCategories = () => {
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        categories: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useCategories;

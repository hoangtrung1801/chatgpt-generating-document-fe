import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const useCategoryWithId = (categoryId: number) => {
    const API_URL = `${BE_URL}/categories/${categoryId}`;
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        category: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useCategoryWithId;

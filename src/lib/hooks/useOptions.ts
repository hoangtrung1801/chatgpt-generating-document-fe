import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const useOptions = () => {
    const API_URL = `${BE_URL}/options`;
    const { data, error }: SWRResponse = useSwr(
        `${API_URL}`,
        fetchWithCredentials
    );

    return {
        options: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useOptions;

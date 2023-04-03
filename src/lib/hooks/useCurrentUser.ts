import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/auth`;

const useCurrentUser = () => {
    const { data, error }: SWRResponse = useSwr(
        `${API_URL}`,
        fetchWithCredentials
    );

    return {
        currentUser: data || undefined,
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useCurrentUser;

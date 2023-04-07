import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";
import { getCookies, setCookie, deleteCookie } from "cookies-next";

const API_URL = `${BE_URL}/users`;

const useGetAllUsers = () => {
    const { data, error }: SWRResponse = useSwr(
        `${API_URL}`,
        fetchWithCredentials
    );

    return {
        users: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetAllUsers;

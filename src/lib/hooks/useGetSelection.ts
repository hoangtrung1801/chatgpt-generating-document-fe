import { BE_URL } from "lib/config";
import useSwr, { SWRResponse } from "swr";
import { getCookies, setCookie, deleteCookie } from "cookies-next";

const API_URL = `${BE_URL}/users`;

const useGetUser = () => {
    const ID = getCookies("userID");
    const { data, error }: SWRResponse = useSwr(`${API_URL}/${ID.userID}`);

    return {
        user: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetUser;

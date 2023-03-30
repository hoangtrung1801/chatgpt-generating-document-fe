import { BE_URL } from "lib/config";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/users`;

const useGetUser = (userId: number) => {
    const { data, error }: SWRResponse = useSwr(`${API_URL}/${userId}`);

    return {
        user: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetUser;

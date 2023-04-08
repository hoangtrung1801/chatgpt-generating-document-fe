import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = (epicId: number) => `${BE_URL}/epics/${epicId}`;

const useEpic = (epicId: number) => {
    const { data, error }: SWRResponse = useSwr(
        API_URL(epicId),
        fetchWithCredentials
    );

    return {
        epic: !data ? undefined : data.data,
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useEpic;

import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = (sprintId: number) => `${BE_URL}/sprints/${sprintId}`;

const useSprint = (sprintId: number) => {
    const { data, error }: SWRResponse = useSwr(
        API_URL(sprintId),
        fetchWithCredentials
    );

    return {
        sprint: !data ? undefined : data.data,
        isSprintLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useSprint;

import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

export const API_URL = `${BE_URL}/selections/:selectionId/user-stories`;

const useUserStoriesOfSelection = (selectionId: number) => {
    const { data, error, mutate }: SWRResponse = useSwr(
        `${API_URL.replace(":selectionId", selectionId.toString())}`,
        fetchWithCredentials
    );

    return {
        userStories: data === undefined ? undefined : data.data,
        isUserStoriesLoading: !error && !data,
        // isLoading: true,
        error: error,
        mutate,
    };
};

export default useUserStoriesOfSelection;

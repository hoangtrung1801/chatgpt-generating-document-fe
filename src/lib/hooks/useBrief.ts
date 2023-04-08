import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = (selectionId: number) =>
    `${BE_URL}/selections/${selectionId}/brief`;

const useBrief = (selectionId: number) => {
    const { data, error }: SWRResponse = useSwr(
        API_URL(selectionId),
        fetchWithCredentials
    );

    return {
        brief: !data ? undefined : data.data,
        isBriefLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useBrief;

import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = (selectionId: number) => `${BE_URL}/selections/${selectionId}`;

const useSelection = (selectionId: number) => {
    const { data, error, mutate }: SWRResponse = useSwr(
        API_URL(selectionId),
        fetchWithCredentials
    );

    return {
        selection: !data ? undefined : data.data,
        isSelectionLoading: !error && !data,
        // isLoading: true,
        error: error,
        mutateSelection: mutate,
    };
};

export default useSelection;

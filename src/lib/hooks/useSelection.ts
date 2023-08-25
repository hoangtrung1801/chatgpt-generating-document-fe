import getSelection from "lib/api/getSelection";
import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const GET_SELECTION = "GET_SELECTION";

const API_URL = (selectionId: number) => `${BE_URL}/selections/${selectionId}`;

const useSelection = ({
    enabled = true,
    params,
    selectionId,
}: {
    selectionId: number;
    params: any;
    enabled: boolean;
}) => {
    const { data, error, mutate }: SWRResponse = useSwr(
        enabled ? [GET_SELECTION, params] : null,
        () => getSelection(selectionId)
        // fetchWithCredentials
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

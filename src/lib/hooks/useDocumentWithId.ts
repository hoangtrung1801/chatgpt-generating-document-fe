import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const useDocumentWithId = (selectionId: number) => {
    const API_URL = `${BE_URL}/chatgpt/generate-document/${selectionId}`;
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        document: data !== undefined ? data.data : undefined,
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useDocumentWithId;

import { BE_URL } from "lib/config";
import useSwr, { SWRResponse } from "swr";

const useGetTodos = (selectionId: number) => {
    const { data, error }: SWRResponse = useSwr(
        `${BE_URL}/selections/${selectionId}/todos`
    );

    return {
        todos: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetTodos;

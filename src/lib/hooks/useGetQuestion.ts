import { BE_URL } from "lib/config";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/questions`;

const useGetQuestion = (questionId: number) => {
    const { data, error }: SWRResponse = useSwr(`${API_URL}/${questionId}`);

    return {
        question: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetQuestion;

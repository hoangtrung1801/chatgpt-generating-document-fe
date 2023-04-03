import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";

const API_URL = `${BE_URL}/questions`;

const useGetQuestions = (categoryId: number) => {
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        questions:
            data !== undefined
                ? data.data.filter(
                      (question: any) => question.categoryId === categoryId
                  )
                : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useGetQuestions;

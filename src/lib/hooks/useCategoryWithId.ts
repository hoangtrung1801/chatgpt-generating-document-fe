import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";
import useSwr, { SWRResponse } from "swr";
// "id": 4,
//         "name": "Delivery",
//         "thumbnail": "https://s3.eu-west-3.amazonaws.com/sparkplan.ai/public/category/travel.png",
//         "status": "LAUNCH",
//         "apps": [
//             {
//                 "id": 14,
//                 "name": "Deliveroo",
//                 "thumbnail": "https://s3.eu-west-3.amazonaws.com/sparkplan.ai/public/app/deliveroo-logo+1.png",
//                 "status": "LAUNCH",
//                 "categoryId": 4
//             },]

export interface CategoryWithIdResponse {}

const useCategoryWithId = (categoryId: number) => {
    const API_URL = `${BE_URL}/categories/${categoryId}`;
    const { data, error }: SWRResponse = useSwr(API_URL, fetchWithCredentials);

    return {
        category: data !== undefined ? data.data : [],
        isLoading: !error && !data,
        // isLoading: true,
        error: error,
    };
};

export default useCategoryWithId;

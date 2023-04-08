import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const METHOD = "POST";
const API_URL = `${BE_URL}/epics`;

interface CreateEpicData {
    title: string;
    description: string;
    selectionId: number;
}

export default async function createEpic(createEpicData: CreateEpicData) {
    const data = await fetchWithCredentials(API_URL, {
        method: METHOD,
        body: JSON.stringify({
            ...createEpicData,
        }),
    });

    return data;
}

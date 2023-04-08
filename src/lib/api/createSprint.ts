import { BE_URL } from "lib/config";
import { fetchWithCredentials } from "lib/fetcher";

const METHOD = "POST";
const API_URL = `${BE_URL}/sprints`;

interface CreateSprintProps {
    name: string;
    startDate: string;
    endDate: string;
    selectionId: number;
}

export default async function createSprint(
    createSprintData: CreateSprintProps
) {
    const data = await fetchWithCredentials(API_URL, {
        method: METHOD,
        body: JSON.stringify({
            ...createSprintData,
        }),
    });

    return data;
}

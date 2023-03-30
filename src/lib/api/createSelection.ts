import { BE_URL } from "lib/config";

const API_URL = `${BE_URL}/selections`;

export default async function createSelection(
    categoryId: number,
    selectedOptions: (number | undefined)[],
    title: string,
    description: string
) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            categoryId,
            selectedOptions,
            title,
            description,
        }),
    });
    const data = await response.json();
    return data;
}

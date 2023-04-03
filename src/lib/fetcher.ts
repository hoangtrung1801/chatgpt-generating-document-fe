const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...init?.headers,
        },
        ...init,
    }).then((res) => res.json());

export const fetchWithCredentials = (
    input: RequestInfo | URL,
    init?: RequestInit
) => {
    const headers = {
        "Content-Type": "application/json",
        ...init?.headers,
    };
    return fetch(input, {
        mode: "cors",
        credentials: "include",
        headers,
        ...init,
    }).then((res) => res.json());
};

export default fetcher;

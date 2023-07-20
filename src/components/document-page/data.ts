export const checkEmpty = (arr: Array<any> = [], idx: number) => {
    if (arr[idx] && arr[idx].length !== 0) return !Boolean(arr[idx]);
    return true;
};

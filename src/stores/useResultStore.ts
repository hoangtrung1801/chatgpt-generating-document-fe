import { create } from "zustand";

export interface ResultStoreState {
    result: string | undefined;
    setResult: (result: string) => void;
}

const useResultStore = create<ResultStoreState>((set, get) => ({
    result: undefined,
    setResult: (result) => set({ result }),
}));
export default useResultStore;

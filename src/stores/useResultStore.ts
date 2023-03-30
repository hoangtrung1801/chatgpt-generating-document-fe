import { create } from "zustand";

export interface ResultStoreState {
    result: string;
    setResult: (result: string) => void;
}

const useResultStore = create<ResultStoreState>((set, get) => ({
    result: "",
    setResult: (result) => set({ result }),
}));
export default useResultStore;

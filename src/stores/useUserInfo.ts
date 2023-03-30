import { create } from "zustand";

export interface USerStoreState {
    selectionID: number[];
    setSelectionID: (selectionIDs: number[]) => void;
}

const useUSerStoreState = create<USerStoreState>((set, get) => ({
    selectionID: [],
    setSelectionID: (selectionID) => set({ selectionID }),
}));
export default useUSerStoreState;

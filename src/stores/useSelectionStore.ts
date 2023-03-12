import { create } from "zustand";

export interface SelectionStoreState {
    category: string | undefined;
    setCategory: (category: string) => void;

    options: object[];
    addOption: (option: object) => void;
    addOptions: (options: object[]) => void;
    updateOptions: (options: object[]) => void;
    removeOption: (option: object) => void;
    clearOptions: () => void;
}

const useSelectionStore = create<SelectionStoreState>((set, get) => ({
    category: undefined,
    setCategory: (category) => set({ category }),

    options: [],
    addOption: (option) => set({ options: [...get().options, option] }),
    addOptions: (options) => set({ options: [...get().options, ...options] }),
    updateOptions: (options) => set({ options: options }),
    removeOption: (optionId) =>
        set({ options: get().options.filter((id) => id !== optionId) }),
    clearOptions: () => set({ options: [] }),
}));

export default useSelectionStore;

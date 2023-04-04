import { create } from "zustand";

export interface UserStoriesStoreState {
    userStories: object[];
    setUserStories: (todos: object[]) => void;
    updateTodos: (todo: object) => void;
}

const useUserStoriesStore = create<UserStoriesStoreState>((set, get) => ({
    userStories: [],
    setUserStories: (userStories: object[]) => set({ userStories }),
    updateTodos: (todo: object) => {},
}));
export default useUserStoriesStore;

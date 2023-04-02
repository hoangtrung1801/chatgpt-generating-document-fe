import { create } from "zustand";

export interface TodoStoreState {
    todos: object[];
    setTodos: (todos: object[]) => void;
}

const useTodoStoreStore = create<TodoStoreState>((set, get) => ({
    todos: [],
    setTodos: (todos: object[]) => set({ todos }),
}));
export default useTodoStoreStore;

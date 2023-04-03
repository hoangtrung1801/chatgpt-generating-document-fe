import { create } from "zustand";

export interface TodoStoreState {
    todos: object[];
    setTodos: (todos: object[]) => void;
    updateTodos: (todo: object) => void;
}

const useTodoStoreStore = create<TodoStoreState>((set, get) => ({
    todos: [],
    setTodos: (todos: object[]) => set({ todos }),
    updateTodos: (todo: object) => {},
}));
export default useTodoStoreStore;

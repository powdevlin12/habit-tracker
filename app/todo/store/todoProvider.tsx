import { createContext, useContext } from 'react';
import { todoStore } from './todoStore';

const TodoContext = createContext(todoStore);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>
	);
};

export const useTodoStore = () => useContext(TodoContext);

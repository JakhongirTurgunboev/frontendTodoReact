import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async (pageNumber) => {
		const resp = await fetch(`https://backend-flask-fd7d.onrender.com/api?page=${pageNumber}`);
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const updateTodoAsync = createAsyncThunk(
	'todos/updateTodoAsync',
	async ({ id, ...updatedFields }, thunkAPI) => {
		const state = thunkAPI.getState();
		const accessToken = state.login.accessToken;

		const resp = await fetch(`https://backend-flask-fd7d.onrender.com/api/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
			body: JSON.stringify(updatedFields),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { id, todo };
		} else {
			throw new Error('Todo update failed');
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://backend-flask-fd7d.onrender.com/api`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: payload.username,
							email: payload.email,
							task_text: payload.task_text,
							status: false}),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://backend-flask-fd7d.onrender.com/api/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://backend-flask-fd7d.onrender.com/api/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: {results: []},
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				username: action.payload.username,
				email: action.payload.email,
				task_text: action.payload.task_text,
				status: false,
			};
			state.results.push(todo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].status = action.payload.status;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.results.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
		},
		[updateTodoAsync.fulfilled]: (state, action) => {
			const index = state.results.findIndex((todo) => todo.id === action.payload.id);
			state[index] = action.payload.todo;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

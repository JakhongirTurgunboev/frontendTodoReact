import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import loginReducer from './loginSlice';


export default configureStore({
	reducer: {
		login: loginReducer,
		todos: todoReducer,
	},
});

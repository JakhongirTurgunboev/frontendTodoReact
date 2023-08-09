import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	const [filter, setFilter] = useState({
		username: '',
		task_text: '',
		email: '',
	});

	const [sortBy, setSortBy] = useState({
		field: 'username', // Default sort field
		order: 'asc',     // Default sort order
	});

	const filteredTodos = todos.filter(todo => {
		const usernameMatch = !filter.username || todo.username.includes(filter.username);
		const taskTextMatch = !filter.task_text || todo.task_text.includes(filter.task_text);
		const emailMatch = !filter.email || todo.email.includes(filter.email);
	  
		return usernameMatch && taskTextMatch && emailMatch;
	  });

	const sortedTodos = [...filteredTodos].sort((a, b) => {
		const fieldA = a[sortBy.field]?.toLowerCase() || ''; // Check if property exists, use an empty string as a fallback
		const fieldB = b[sortBy.field]?.toLowerCase() || ''; // Check if property exists, use an empty string as a fallback
	  
		if (fieldA < fieldB) {
		  return sortBy.order === 'asc' ? -1 : 1;
		}
		if (fieldA > fieldB) {
		  return sortBy.order === 'asc' ? 1 : -1;
		}
		return 0;
	  });

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	return (
		<div className='container'>
			<div className='row my-4'>
				<div className='col-md-12'>
					<div className='filters'>
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Filter by Username'
							value={filter.username}
							onChange={(e) => setFilter({ ...filter, username: e.target.value })}
						/>
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Filter by Task Text'
							value={filter.task_text}
							onChange={(e) => setFilter({ ...filter, task_text: e.target.value })}
						/>
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Filter by Email'
							value={filter.email}
							onChange={(e) => setFilter({ ...filter, email: e.target.value })}
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-12'>
					<table className='table'>
						<thead>
							<tr>
								<th>Username</th>
								<th>Email</th>
								<th>Task Text</th>
								<th>Completed</th>
							</tr>
						</thead>
						<tbody>
							{sortedTodos.map((todo) => (
								<TodoItem
									key={todo.id}
									id={todo.id}
									username={todo.username}
									task_text={todo.task_text}
									email={todo.email}
									status={todo.status}
								/>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='row my-4'>
				<div className='col-md-12'>
					<div className='sort-options'>
						<label className='mr-2'>
							Sort by:
							<select
								className='form-control-sm ml-1'
								value={sortBy.field}
								onChange={(e) =>
									setSortBy({ ...sortBy, field: e.target.value })
								}
							>
								<option value='username'>Username</option>
								<option value='email'>Email</option>
								<option value='task_text'>Task Text</option>
							</select>
						</label>
						<label>
							Order:
							<select
								className='form-control-sm ml-1'
								value={sortBy.order}
								onChange={(e) =>
									setSortBy({ ...sortBy, order: e.target.value })
								}
							>
								<option value='asc'>Ascending</option>
								<option value='desc'>Descending</option>
							</select>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;

import React from 'react';
import { useDispatch } from 'react-redux';

const TodoItem = ({ username,email, task_text, status }) => {

	return (
				<tr>
				<td>{username}</td>
				<td>{email}</td>
				<td>{task_text}</td>
				<td><input
						type='checkbox'
						className='mr-3'
						checked={status}
					></input></td>
				</tr>
	);
};

export default TodoItem;

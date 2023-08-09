import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';

const AddTodoForm = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		task_text: '',
	  });

	const [emailError, setEmailError] = useState('');
	
	const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
	};

	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		
		if (
		  values.username &&
		  validateEmail(values.email) && // Validate email format
		  values.task_text
		) {
		  dispatch(addTodoAsync(values));
		} else {
		  setEmailError('Invalid email format');
		}
	  };
	
	

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>

				<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Username'
				value={values.username}
				onChange={(event) =>
					setValues({ ...values, username: event.target.value })
				}
				/>

				<input
				type='email'
				className='form-control mb-2 mr-sm-2'
				placeholder='Email'
				value={values.email}
				onChange={(event) => {
					setValues({ ...values, email: event.target.value });
					setEmailError(''); // Clear email error when input changes
				  }}
				/>
				{emailError && <div className="invalid-feedback">{emailError}</div>}

				<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Task Text'
				value={values.task_text}
				onChange={(event) =>
					setValues({ ...values, task_text: event.target.value })
				}
				/>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
			
			<button type='button' className='btn btn-primary mb-2 ml-4'>
				Login
			</button>
		</form>
	);
};

export default AddTodoForm;

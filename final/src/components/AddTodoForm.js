import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';
import LoginModal from './LoginModal';
import { selectAccessToken, logoutAsync } from '../redux/loginSlice';

const AddTodoForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    task_text: '',
  });

  const [emailError, setEmailError] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const accessToken = useSelector(selectAccessToken);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    if (values.username && validateEmail(values.email) && values.task_text) {
      dispatch(addTodoAsync(values));
    } else {
      setEmailError('Invalid email format');
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
	try {
	  await dispatch(logoutAsync());
	  // Handle successful logout, such as redirecting or showing a message
	} catch (error) {
	  console.error('Logout failed:', error.message);
	  // Handle logout failure, such as showing an error message
	}
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>You are logged in.</p>
          <button
            type='button'
            className='btn btn-primary mb-2'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
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
              setEmailError('');
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
          <button
            type='button'
            className='btn btn-primary mb-2 ml-4'
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
        </form>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AddTodoForm;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync, updateTodoAsync } from '../redux/todoSlice';
import { selectAccessToken } from '../redux/loginSlice';
import TodoItem from './TodoItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const accessToken = useSelector(selectAccessToken);
  console.log(accessToken);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getTodosAsync(currentPage));
  }, [dispatch, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const [filter] = useState({
    username: '',
    task_text: '',
    email: '',
  });

  const [sortBy, setSortBy] = useState({
    field: 'username', // Default sort field
    order: 'asc',     // Default sort order
  });

  // Check if todos.results is defined before filtering and sorting
  const filteredTodos = todos && todos.results && todos.results.filter((todo) => {
    const usernameMatch = !filter.username || todo.username.includes(filter.username);
    const taskTextMatch = !filter.task_text || todo.task_text.includes(filter.task_text);
    const emailMatch = !filter.email || todo.email.includes(filter.email);

    return usernameMatch && taskTextMatch && emailMatch;
  });

  // Check if filteredTodos is defined before sorting
  const sortedTodos = filteredTodos && [...filteredTodos].sort((a, b) => {
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

  const handleUpdateTodo = async (id, updatedFields) => {
    if (accessToken) {
      try {
        const actionResult = await dispatch(updateTodoAsync({ id, ...updatedFields }));
        if (updateTodoAsync.fulfilled.match(actionResult)) {
          toast.success('Todo updated successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='row my-4'>
        <div className='col-md-12'>
          <div className='sort-options'>
            {/* Sort by field */}
            <label className='mr-2'>
              Sort by:
              <select
                className='form-control-sm ml-1'
                value={sortBy.field}
                onChange={(e) => setSortBy({ ...sortBy, field: e.target.value })}
              >
                <option value='username'>Username</option>
                <option value='email'>Email</option>
                <option value='task_text'>Task Text</option>
              </select>
            </label>
            {/* Sort order */}
            <label>
              Order:
              <select
                className='form-control-sm ml-1'
                value={sortBy.order}
                onChange={(e) => setSortBy({ ...sortBy, order: e.target.value })}
              >
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </label>
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
                <th>Status</th>
                {accessToken && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {sortedTodos && sortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  username={todo.username}
                  task_text={todo.task_text}
                  email={todo.email}
                  status={todo.status}
                  edited={todo.edited}
                  isAuthenticated={!!accessToken}
                  onUpdate={handleUpdateTodo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='row my-4'>
        <div className='col-md-12'>
          <div className='pagination'>
            <button
              className='btn btn-primary mr-2'
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <button
              className='btn btn-primary'
              disabled={!todos || currentPage === todos.total_pages}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoList;

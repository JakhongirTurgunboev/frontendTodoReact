import React, { useState } from 'react';

const TodoItem = ({ id, username, task_text, email, status, isAuthenticated, onUpdate, edited }) => {
  const [editableTaskText, setEditableTaskText] = useState(task_text);
  const [editableStatus, setEditableStatus] = useState(status);

  const handleTaskTextChange = (event) => {
    setEditableTaskText(event.target.value);
  };

  const handleStatusChange = (event) => {
    setEditableStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    onUpdate(id, { task_text: editableTaskText, status: editableStatus });
  };

  return (
    <tr>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        {isAuthenticated ? (
          <>
            <input
              type='text'
              value={editableTaskText}
              onChange={handleTaskTextChange}
            />
          </>
        ) : (
          <>
            {task_text}
            {edited && <small className="text-muted ml-1">edited by admin</small>}
          </>
        )}
      </td>
      <td>
        {isAuthenticated ? (
          <select value={editableStatus} onChange={handleStatusChange}>
            <option value="false">In Progress</option>
            <option value="true">Completed</option>
          </select>
        ) : (
          status ? ("Completed") : ("In progress")
        )}
      </td>
      {isAuthenticated && (
        <td>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Update
          </button>
        </td>
      )}
    </tr>
  );
};

export default TodoItem;

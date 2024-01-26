// TaskItem.js
import React, { useState } from 'react';
import "./TaskItem.css"
const TaskItem = ({ task, onDeleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = {
      taskId: task.taskId,
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
    };
    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className='taskItemCont' style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="text"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <div className='title'>{task.title}</div>
          <p >{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <div className='btnContTaskItem'>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => onDeleteTask(task.taskId)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./taskitem.css";
import { TaskState } from "../../App";

export default function TaskItem({
  id,
  title,
  taskState,
  onUpdateTask,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);

  const onContainerClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const onUpdate = (newTitle) => {
    setIsEditing(false);
    console.log("state");
    if (newTitle.length > 0) {
      onUpdateTask(id, newTitle, taskState);
    } else {
      onDeleteTask(id);
    }
  };

  const onChangeTaskState = (event) => {
    console.log("here: ", id, title, event.target.value);
    onUpdateTask(id, title, event.target.value);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <EditableItem title={title} onUpdate={onUpdate} />
      ) : (
        <div>
          <div onClick={onContainerClick}>{title}</div>
          <select onChange={onChangeTaskState} value={taskState}>
            <option value={TaskState.todo}>{TaskState.todo}</option>
            <option value={TaskState.doing}>{TaskState.doing}</option>
            <option value={TaskState.done}>{TaskState.done}</option>
          </select>
        </div>
      )}
    </div>
  );
}

TaskItem.propTypes = {
  title: PropTypes.string.isRequired
};

function EditableItem({ title, onUpdate }) {
  const [editableTitle, setEditableTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onEdit = (event) => {
    setEditableTitle(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onUpdate(editableTitle);
    }
  };

  return (
    <input
      type="text"
      value={editableTitle}
      ref={inputRef}
      onChange={onEdit}
      onKeyPress={onKeyPress}
    />
  );
}

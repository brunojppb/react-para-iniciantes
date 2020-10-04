import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./taskitem.css";

export default function TaskItem({ id, title, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const onContainerClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const onUpdate = (newTitle) => {
    setIsEditing(false);
    if (newTitle.length > 0) {
      onUpdateTask(id, newTitle);
    } else {
      onDeleteTask(id);
    }
  };

  return (
    <div className="task-item" onClick={onContainerClick}>
      {isEditing ? <EditableItem title={title} onUpdate={onUpdate} /> : title}
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

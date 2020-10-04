import React from "react";
import PropTypes from "prop-types";
import "./tasklist.css";
import plusIcon from "../../img/plus-icon.svg";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({
  title,
  taskState,
  onCreateTask,
  onDeleteTask,
  onUpdateTask,
  tasks = []
}) {
  const addTask = (event) => {
    event.preventDefault();
    onCreateTask("Nova Tarefa", taskState);
  };

  return (
    <div className={`tasklist ${tasks.length > 0 ? "with-content" : ""}`}>
      <div className="title">{title}</div>
      <div className="content">
        {tasks.map((t) => {
          return (
            <TaskItem
              key={t.id}
              id={t.id}
              title={t.title}
              taskState={taskState}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
        {tasks.length === 0 && <div className="empty-list">Lista vazia</div>}
        <button className="btn" onClick={addTask}>
          <img src={plusIcon} alt="adicionar" />
          Nova Tarefa
        </button>
      </div>
    </div>
  );
}

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  taskState: PropTypes.string.isRequired,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

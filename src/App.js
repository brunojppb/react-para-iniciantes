import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import "./styles.css";

export const TaskState = {
  todo: "Pendente",
  doing: "Fazendo",
  done: "Completa"
};

let id = 0;

export default function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = (title, state) => {
    const newTask = {
      id: ++id,
      title,
      state
    };
    setTasks((existing) => [...existing, newTask]);
  };

  const onDeleteTask = (taskId) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((t) => t.id !== taskId);
    });
  };

  const updateTask = (taskId, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, title, state };
        } else {
          return t;
        }
      });
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="tasklist-container">
        <TaskList
          title={TaskState.todo}
          taskState={TaskState.todo}
          tasks={tasks.filter((t) => t.state === TaskState.todo)}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={onDeleteTask}
        />
        <TaskList
          title={TaskState.doing}
          taskState={TaskState.doing}
          tasks={tasks.filter((t) => t.state === TaskState.doing)}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={onDeleteTask}
        />
        <TaskList
          title={TaskState.done}
          taskState={TaskState.done}
          tasks={tasks.filter((t) => t.state === TaskState.done)}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}

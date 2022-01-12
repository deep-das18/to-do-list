import React, { useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import { data } from "./data";
import Modal from "./Modal";
import { IoMdCloseCircle } from "react-icons/io";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return data;
  }
};

const List = () => {
  const [task, setTask] = useState(getLocalStorage());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [messageType, setMessageType] = useState("");
  const [addingTask, setAddingTask] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const container = useRef({});
  const newTask = useRef(null);
  useEffect(() => {
    const height = container.current.getBoundingClientRect().height;
    localStorage.setItem("list", JSON.stringify(task));
    if (height > 583) {
      setScrollable(true);
    }
    if (task.length < 9) {
      setScrollable(false);
    }
  }, [task]);
  const editTask = (id, newName) => {
    if (!newName) {
      setIsModalOpen(true);
      setMessageType("danger");
      setModalContent("Please enter task name");
    } else {
      task.map((item) => {
        if (item.id === id) {
          setIsModalOpen(true);
          const newTask = { ...item, name: newName };
          const newTaskArray = task.map((item) => {
            if (item.id === id) {
              return newTask;
            } else {
              return item;
            }
          });
          setModalContent("Task Edited");
          setMessageType("success");
          return setTask(newTaskArray);
        }
      });
    }
  };
  const deleteTask = (id) => {
    const newArray = task.filter((item) => item.id !== id);
    setIsModalOpen(true);
    setModalContent("Task Deleted");
    setMessageType("danger");
    setTask(newArray);
  };
  const taskCompleted = (id) => {
    task.map((item) => {
      if (item.id === id) {
        setIsModalOpen(true);
        const newTask = { ...item, completed: !item.completed };
        const newTaskArray = task.map((item) => {
          if (item.id === id) {
            return newTask;
          } else {
            return item;
          }
        });
        setModalContent("Task Updated");
        setMessageType("success");
        return setTask(newTaskArray);
      }
    });
  };
  const addTask = (name) => {
    if (name) {
      const tempTask = {
        id: task.length + 1,
        name: name,
        completed: false,
      };
      const tempArray = [...task, tempTask];
      setTask(tempArray);
      setIsModalOpen(true);
      setModalContent("Task Added");
      setMessageType("success");
      setAddingTask(false);
    } else {
      setIsModalOpen(true);
      setModalContent("Please Enter Task Name");
      setMessageType("danger");
    }
  };
  return (
    <div className="section-center">
      <h1>Task Manager</h1>
      <div className="underline"></div>
      <article
        ref={container}
        className={`${scrollable ? "scrollable" : null} list`}
      >
        {isModalOpen && (
          <Modal
            modalContent={modalContent}
            setIsModalOpen={setIsModalOpen}
            messageType={messageType}
          />
        )}
        {task.length === 0 ? (
          <h2 className="heading">Task List Is Empty</h2>
        ) : (
          task.map((item) => {
            return (
              <ListItem
                key={item.id}
                {...item}
                editTask={editTask}
                deleteTask={deleteTask}
                taskCompleted={taskCompleted}
              />
            );
          })
        )}
        {addingTask || (
          <button className="add-task" onClick={() => setAddingTask(true)}>
            Add A Task +
          </button>
        )}

        {addingTask && (
          <div className="form-control">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask(newTask.current.value);
              }}
              className="dropdown_menu-10 flex-form"
            >
              <input type="text" ref={newTask} className="input new-task" />
              <button type="submit" className="btn done add">
                Add
              </button>
              <button
                type="button"
                onClick={() => setAddingTask(false)}
                className="btn delete cancel"
              >
                <IoMdCloseCircle />
              </button>
            </form>
          </div>
        )}
      </article>
    </div>
  );
};

export default List;

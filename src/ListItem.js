import React, { useState, useRef } from "react";
import { FaTasks, FaTrash, FaEdit } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const ListItem = ({
  name,
  id,
  completed,
  editTask,
  deleteTask,
  taskCompleted,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const btnValue = useRef(null);
  const taskName = useRef("");
  const handleEdit = () => {
    const condition = btnValue.current.value;
    if (condition === "Edit") {
      setIsEditOpen(true);
    }
    if (condition === "Cancel") {
      setIsEditOpen(false);
    }
  };
  return (
    <div className="task-container">
      <section className="task">
        <FaTasks className="task-icon" />
        <p className={`task-name ${completed && "completed"}`}>{name}</p>
        <div className="btn-container">
          <input
            type="checkbox"
            className="check"
            defaultChecked={completed ? "checked" : ""}
            onClick={() => taskCompleted(id)}
          />
          <button
            className="btn edit"
            onClick={handleEdit}
            ref={btnValue}
            value={isEditOpen ? "Cancel" : "Edit"}
          >
            {isEditOpen ? <IoMdCloseCircle /> : <FaEdit />}
          </button>

          <button className="btn delete" onClick={() => deleteTask(id)}>
            <FaTrash />
          </button>
        </div>
      </section>
      {isEditOpen && (
        <div className="form-control">
          <form
            className="dropdown_menu-10"
            onSubmit={(e) => {
              e.preventDefault();
              editTask(id, taskName.current.value);
              taskName.current.value
                ? setIsEditOpen(false)
                : setIsEditOpen(true);
            }}
          >
            <input type="text" className="input" ref={taskName} />
            <button type="submit" className="btn done">
              Done
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListItem;

import React, { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";

const TodoItem = ({
  currentTodo,
  listItems,
  addToList,
  onCheck,
  deleteItem,
  saveList,
  save
}) => {

  // ------ STATE --------
  const [item, setItem] = useState("");

// ------------------- RETURN ------------------
  if(currentTodo && listItems)
  return (
    <div className="todo-main">
      <h3 className="note-title"> {currentTodo[0].title}</h3>
      <div className="add-todo">
        <label htmlFor="input-todo" className="input-list-item">
          <input
            type="text"
            value={item}
            className="input-content"
            onChange={(event) => setItem(event.target.value)}
          />
        </label>
      </div>
      <button
        className="btn-add "
        onClick={() => {
          addToList(item);
          setItem("");
        }}
      >
        <BsFillPlusCircleFill />
      </button>

      <ul className="todo-list">
        {listItems.map((item, index) => {
          return (
            <li key={index} className="single-list-item">
              <button className="del-btn" onClick={() => deleteItem(item)}>
                <BiMinusCircle />
              </button>
              <div className="checkbox-main">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={item.content}
                  checked={item.ischecked ? true : false}
                  onChange={() => onCheck(item)}
                />
              </div>

              <div
                className={
                  item.ischecked ? "strike todo-content" : " todo-content"
                }
              >
                {item.content}
              </div>
              {/* <div></div> */}
            </li>
          );
        })}
      </ul>
      <button className="button" onClick={() => saveList()}>
        {" "}
        SAVE LIST{" "}
      </button>
      <h4 className={save ? "saved" : "not-saved"}>Saved Successfully</h4>
    </div>
  );
  else
  return (
    <h2 className='message'> Open your  Todo's, or Create one</h2>
  )
};
export default TodoItem;

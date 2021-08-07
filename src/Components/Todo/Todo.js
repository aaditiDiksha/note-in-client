import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import SideNav from "../SideNav/SideNav";
import TodoItem from "./TodoItem";
import MobileSideNav from "../MobileSideNav/MobileSideNav";
import Loader from "../Loader/Loader";

export default function Todo({ user, where }) {
  //----------------------- STATES -----------------
  const [allTodo, setAllTodo] = useState([]);
  const [currentTodo, setCurrentTodo] = useState();
  const [allListItems, setAllListItems] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);

  const direction = useRef(where);

  // ----------------- FUNCTIONS ------------------
  const toggleToDo = (item) => {
    setCurrentTodo(allTodo.filter((todo) => todo.todoid === item.todoid));
  };
  const settingTitle = (event) => {
    setTitle(event.target.value);
  };

  //------------------------ USE EFFECT -----------------------
  useEffect(() => {
    setLoading(false);
    setListItems(
      allListItems.filter((item) => item.todoid === currentTodo[0].todoid)
    );

    if (direction.current === "Todo") {
      setLoading(true);
      fetch(
        `https://shielded-earth-87111.herokuapp.com/profile/todo/${user.userid}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAllTodo(data.todos);
          setAllListItems(data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      direction.current = "";
      //if currentpages is empty then set it
    }
  }, [currentTodo]);

  // ---------------------------- SAVE -----------------------------------
  const saveList = () => {
    setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/saveTodo/${user.userid}/${currentTodo[0].todoid}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listItems: listItems,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setAllListItems(data);
        setLoading(false);
        setSave(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setTimeout(() => setSave(false), 500);

    //if currentpages is empty then set it
  };

  // ----------------------------- TODO OPERATIONS --------------------------------

  // ------------------------ ADD NEW LIST ------------------------
  const addTodo = () => {
    setListItems([]);
    setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/${user.userid}/addTodo/${title}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === "cannot add Todo") {
          alert(" cannot have the same name again");
        } else setAllTodo([...allTodo, data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  // ------------------------- DELETE EXISTING LIST ------------------------------
  const delTodo = (delItem) => {
    setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/delTodo/${delItem.todoid}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllTodo(data);
        setListItems();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // ----------------------------- LIST ITEM OPERATIONS --------------------------------

  //----------------- ADD NEW ITEM INTO LIST ----------------
  const addToList = (item) => {
    var repeating = false;
    listItems.every((task) => {
      if (task.content === item || item === "") {
        repeating = true;
        return false;
      }
      return true;
    });

    if (repeating === false) {
      let obj = {
        content: item,
        ischecked: false,
      };
      setListItems([...listItems, obj]);
    }
  };
  // -------------- CHECK AN ITEM IN LIST ---------------
  const onCheck = (strikeItem) => {
    let arr = listItems.map((task, index) => {
      return task.content === strikeItem.content
        ? { ...task, ischecked: !task.ischecked }
        : { ...task };
    });
    setListItems(arr);
  };

  // ---------------------- DELETE A ITEM IN LIST ----------------------
  const deleteItem = (delItem) => {
    let arr = listItems.filter((item) => item.content !== delItem.content);
    setListItems(arr);
  };

  // --------------------------- RETURN -------------------------------
  return (
    <div className="todo">
      {loading && <Loader />}

      <div className="todo-nav">
        <SideNav
          items={allTodo}
          toggleContent={toggleToDo}
          settingTitle={settingTitle}
          heading="To-do lists"
          addContent={addTodo}
          delContent={delTodo}
        />
      </div>
      <div className="mob-nav">
        <MobileSideNav
          mainNav="todo"
          allTodo={allTodo}
          toggleTodo={toggleToDo}
          addTodo={addTodo}
          delTodo={delTodo}
          settingTitle={settingTitle}
        />
      </div>
      <TodoItem
        currentTodo={currentTodo}
        listItems={listItems}
        addToList={addToList}
        onCheck={onCheck}
        deleteItem={deleteItem}
        saveList={saveList}
        save={save}
      />
    </div>
  );
}

//increasing item count

import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import {  HiMenu } from "react-icons/hi";
import {GrClose} from 'react-icons/gr'
import "./MobileSideNav.css";

export default function SubMenu({
  mainNav,
  currentPages,
  allNotes,
  toggleNotebook,
  toggleCurrentPage,
  addNote,
  settingTitle,
  currentPage,
  allTodo,
  toggleTodo,
  addTodo,
  addPage,
  delNote,
  delPage,
  delTodo,
  noteTitle
}) {
  const [currentSideNav, setCurrentSideNav] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const onClickButton = () => {    
    setIsNavOpen(!isNavOpen);
  };
  useEffect(() => {

    if (isNavOpen) {
      setCurrentSideNav(mainNav ==="MyNotebooks" ? 'notebook' :'todo');

    } else {
      setCurrentSideNav("");

    }
  }, [isNavOpen]);

  const toggle = (index) => {
    if (currentSideNav === "notebook") {
      toggleNotebook(index);
      setCurrentSideNav("pages");
    } else if (currentSideNav === "pages") {
      toggleCurrentPage(index);
      setCurrentSideNav("");
      setIsNavOpen(false);
    } else if (currentSideNav === 'todo')
    {
      toggleTodo(index)
      setCurrentSideNav('')
      setIsNavOpen(false);
    }
  }
  
  if (mainNav === "MyNotebooks") {
    return (
      <div>
        <button className="menu" onClick={() => onClickButton()}>
          <HiMenu />
        </button>
        {currentSideNav === "notebook" ? (
          <div className={isNavOpen ? "side-side-nav" : "close-side-nav"}>
            <GrClose
              className="close-btn-mob"
              onClick={() => onClickButton()}
            />
            <SideNav
              view="mobile"
              items={allNotes}
              toggleContent={toggle}
              addContent={addNote}
              delContent={delNote}
              settingTitle={settingTitle}
              heading="Notebooks"
            />
          </div>
        ) : currentSideNav === "pages" ? (
          <div className={isNavOpen ? "side-side-nav" : "close-side-nav"}>
            <GrClose
              className="close-btn-mob"
              onClick={() => onClickButton()}
            />
            <SideNav
              view="mobile"
              items={currentPages}
              toggleContent={toggle}
              addContent={addPage}
              delContent={delPage}
              heading="Pages"
              noteTitle={noteTitle}
              settingTitle={settingTitle}
            />
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    );
  } else {
  
       return (
         <div>
           <button className="menu" onClick={() => onClickButton()}>
             <HiMenu />
           </button>
           {currentSideNav === "todo" ? (
             <div className={isNavOpen ? "side-side-nav" : "close-side-nav"}>
               <GrClose
                 className="close-btn-mob"
                 onClick={() => onClickButton()}
               />
               <SideNav
                 view="mobile"
                 items={allTodo}
                 toggleContent={toggle}
                 addContent={addTodo}
                 delContent={delTodo}
                 heading="To-do"
                 settingTitle={settingTitle}
               />
             </div>
           ) : (
             <div> </div>
           )}
         </div>
       );
  }
}
//main nav= todo or notebooks

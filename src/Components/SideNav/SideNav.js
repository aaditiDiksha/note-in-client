import React from "react";
import "./SideNav.css";
import { VscAdd } from "react-icons/vsc";
import { RiDeleteBin6Fill } from "react-icons/ri";

const SideNav = ({
  items,
  toggleContent,
  heading,
  addContent,
  view,
  delContent,
  settingTitle,
  noteTitle,
  currentNotebook
}) => {
  return (
    <>
      <div className={view === "mobile" ? "open-side-nav" : "side-nav"}>
        {console.log(items)}
        <h2 className="heading">
          {view === "mobile" && heading === "Pages" ? noteTitle : heading}
        </h2>
        <div className="side-nav-content">
          <div className="list">
            {items.map((item, index) => {
              return (
                <div
                  key={
                    heading === "Notebooks"
                      ? item.notebookid
                      : heading === "Pages"
                      ? item.pageid
                      : item.todoid
                  }
                  className={
                    noteTitle === item.title ? "current-list-item" : "list-item"
                  }
                >
                  <li
                    key={item.id}
                    onClick={() => toggleContent(item)}
                    className="list-title"
                  >
                    {item.title}
                  </li>

                  <RiDeleteBin6Fill
                    className="del-icon"
                    onClick={() => delContent(item)}
                  />
                </div>
              );
            })}
          </div>
          <div className="add-content">
            <input
              className="add"
              onChange={settingTitle}
              size="12"
              
            />

            <button
              className="plus"
              onClick={() => {
               currentNotebook? heading === 'Pages' && !currentNotebook.notebookid ? alert('please select a notebook first'):
                addContent(): addContent()
              }}
            >
              <VscAdd />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideNav;
// onClick={()=>saveContent();}

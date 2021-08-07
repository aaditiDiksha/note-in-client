import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import "../MyNotebooks/MyNotebooks.css";
import MobileSideNav from "../MobileSideNav/MobileSideNav";
import Content from "../Content/Content";

const Pages = ({
  currentPages,
  allNotes,
  toggleNotebook,
  addNote,
  addPage,
  delNote,
  delPage,
  settingTitle,
  settingCurrentPages,
  title,
  noteTitle,
  onSetLoading,
  currentNotebook
}) => {

//---------------------- STATES -------------------
  const [currentPage, setCurrentPage] = useState({});
  const [save, setSave] = useState(false);

//---------------------- USE EFFECT --------------------
  useEffect(() => {
    if (!save) setCurrentPage(currentPages[0]);
  }, [currentPages]);

//-------------------------- FUNCTIONS -------------------------
  const toggleCurrentPage = (item) => {
    console.log(save)
    const page = currentPages.filter((page) => page.pageid === item.pageid);
    setCurrentPage(page[0]);
  };
  const settingContent = (content) => {
    setCurrentPage({ ...currentPage, content: content });
  };

//---------------------------- SAVE -----------------------------------
  const onSave = (content) => {
    onSetLoading(true)
    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/saveContent/${currentPage.pageid}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
          title: title,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        let pages = currentPages.map((singlePage) => {
          if (singlePage.pageid === currentPage.pageid) {
            return (singlePage = data);
          }
          return singlePage;
        });
        setSave(true);
        settingCurrentPages(pages, data, currentPage.pageid);
        setCurrentPage({ ...currentPage, content: content });
        onSetLoading(false);
      })
      .catch((err) => {
        console.log(err);
        onSetLoading(false);
      });
    setTimeout(() => setSave(false), 500);
  };

  //---------------------------------- RETURN -------------------------------------------
  return (
    <>
      <div className="mob-nav">
        <MobileSideNav
          mainNav="MyNotebooks"
          currentPages={currentPages}
          currentPage={currentPage}
          allNotes={allNotes}
          toggleNotebook={toggleNotebook}
          toggleCurrentPage={toggleCurrentPage}
          addNote={addNote}
          addPage={addPage}
          delNote={delNote}
          delPage={delPage}
          settingTitle={settingTitle}
          noteTitle={noteTitle}
        />
      </div>
      <div className="myNotebooks-pages ">
        <div className="side-nav-pages">
          <SideNav
            items={currentPages}
            toggleContent={toggleCurrentPage}
            addContent={addPage}
            delContent={delPage}
            settingTitle={settingTitle}
            heading="Pages"
            currentNotebook={currentNotebook}
          />
        </div>

        <Content
          currentPage={currentPage}
          view="mob"
          settingContent={settingContent}
          onSave={onSave}
          settingTitle={settingTitle}
          save={save}
          currentNotebook={currentNotebook}
        />
      </div>
    </>
  );
};

export default Pages;

//props and state change re renders, props change will re render only a particular component which is using the prop
//and is a leaf node

import React, {  useState, useEffect, useRef } from "react";
import SideNav from "../SideNav/SideNav";
import Pages from "../Pages/Pages";
import "./MyNotebooks.css";
import Loader from '../Loader/Loader'

const MyNotebooks = ({where,user})=> {
  //------------------------STATES--------------------------
  const [allNotes, setAllNotes] = useState([]);
  const [currentNotebook, setCurrentNotebook] = useState({ title: " " });
  const [allPages, setAllPages] = useState([]);
  const [currentPages, setCurrentPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const direction = useRef(where);

  // --------------------------USE EFFECT-------------------------------
  useEffect(() => {
    setLoading(false)
    setCurrentPages(
      allPages.filter((page) => page.notebookid === currentNotebook.notebookid)
    );
    if (currentNotebook) setNoteTitle(currentNotebook.title);
    else setNoteTitle("");
    if (direction.current === "Notebooks") {
      fetch(
        `https://shielded-earth-87111.herokuapp.com/profile/notebooks/${user.userid}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAllNotes(data.notebooks);
          setAllPages(data.pages);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      direction.current = "";
    }
  }, [currentNotebook]);

  //----------------------------------------------USE EFFECT FINISHES---------------------------------

  const toggleNotebook = (item) => {
    let nb = allNotes.filter((note) => note.notebookid === item.notebookid);
    setCurrentNotebook(nb[0]);
  };

  const settingTitle = (event) => {
    setTitle(event.target.value);
  };
  const onSetLoading = (isLoading) => {
    setLoading(isLoading);
  };
  const settingCurrentPages = (pages, data, pageid) => {
    let newAllPages = allPages.map((singlePage) => {
      if (singlePage.pageid === pageid) {
        return (singlePage = data);
      }
      return singlePage;
    });
    setAllPages(newAllPages);
    setCurrentPages(pages);
  };
  //--------------------------------------- NOTEBOOKS OPERATIONS ---------------------------------

  //--------------- ADDING NOTEBOOK ------
  const addNote = () => {
    setLoading(true)
    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/${user.userid}/addNotebook/${title}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data === "cannot add notebook") {
          alert(" cannot have the same name again");
        } else setAllNotes([...allNotes, data]);
      })
      .catch((err) => {
        console.log("error here");
        console.log(err);
        setLoading(false);
      });
  };

  //--------------DELETING NOTEBOOK ------------
  const delNote = (delItem) => {
        setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/delNotebook/${delItem.notebookid}`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAllNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //--------------------------------------- PAGES OPERATIONS ---------------------------------

  //--------------- ADDING PAGE ------

  const addPage = () => {
        setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/${user.userid}/${currentNotebook.notebookid}/addPage/${title}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === "cannot add page") {
          alert(" cannot have the same name again");
        } else {
          setCurrentPages([...currentPages, data]);
          setAllPages([...allPages, data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  //--------------DELETING PAGE ------------
const delPage = (delItem) => {
        setLoading(true);

    fetch(
      `https://shielded-earth-87111.herokuapp.com/profile/${currentNotebook.notebookid}/delPage/${delItem.pageid}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentPages(data.currentPages);
        setAllPages(data.pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

//----------------------------- RETURN -------------------------------------------
  
  
    return (
      <div className="myNotebooks">
        {loading && <Loader />}
        <SideNav
          items={allNotes}
          toggleContent={toggleNotebook}
          addContent={addNote}
          delContent={delNote}
          settingTitle={settingTitle}
          heading="Notebooks"
          noteTitle={noteTitle}
        />
        <div className="pages">
          <Pages
            currentNotebook={currentNotebook}
            currentPages={currentPages}
            allNotes={allNotes}
            toggleNotebook={toggleNotebook}
            addNote={addNote}
            addPage={addPage}
            delNote={delNote}
            delPage={delPage}
            settingTitle={settingTitle}
            title={title}
            noteTitle={noteTitle}
            settingCurrentPages={settingCurrentPages}
            onSetLoading={onSetLoading}
          />
        </div>
      </div>
    );
  }


export default MyNotebooks;

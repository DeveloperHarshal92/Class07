import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1",
    },
    {
      title: "test title 2",
      description: "test description 2",
    },
    {
      title: "test title 3",
      description: "test description 3",
    },
    {
      title: "test title 4",
      description: "test description 4",
    },
  ]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDelete(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentNoteid, setCurrentNoteid] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  function handleUpdate(note) {
    setCurrentNoteid(note._id);
    setEditData({
      title: note.title,
      description: note.description,
    });
    setIsModelOpen(true);
  }

  function handleSaveUpdate() {
    axios.patch("http://localhost:3000/api/notes/" + currentNoteid,editData).then((res)=>{
      console.log(res.data)
      setIsModelOpen(false)
      fetchNotes()
    })
  }

  return (
    <>
    
      <form className="note-create-form" onSubmit={handleSubmit}>
        <h1>Notes App</h1>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note,idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="btn">
                <button
                  onClick={() => {
                    handleUpdate(note);
                  }}
                  className="update"
                >
                  <i className="ri-edit-box-line"></i>Update
                </button>
                <button
                  onClick={() => {
                    handleDelete(note._id);
                  }}
                  className="delete"
                >
                  <i className="ri-delete-bin-line"></i>Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {
        isModelOpen && (
          <div className="model-layer">
            <div className="model">
              <h2>Edit Note</h2>
              <input type="text" value={editData.title} onChange={(e)=>setEditData({...editData,title:e.target.value})} />
              <input type="text" value={editData.description} onChange={(e)=>setEditData({...editData,description:e.target.value})} />
              <div className="model-btn">
                <button onClick={handleSaveUpdate}>Save</button>
                <button onClick={()=>setIsModelOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default App;

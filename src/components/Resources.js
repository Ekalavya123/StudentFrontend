import React, { useState } from "react";
import Note from "./ResourceCard";
import ResourcesArea from "./ResourcesArea";
import ProfileNavbar from '../components/ProfileNavbar'
function App() {

  const [notes,setNotes] = useState([])
  
  function addNote(newNote){
      setNotes(prevNotes => {
        return [...prevNotes,newNote];
      });
  }

  function deleteNote(id){
      setNotes(prevNotes => {
        return  prevNotes.filter((noteItem,index) => {
            return index !== id
        })
      })
  }

  return (
    <div>
        <div><ProfileNavbar /></div>
      <ResourcesArea 
       onAdd={addNote}
      />
      {
        notes.map((noteItem,index) => {
          return <Note 
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            delete={deleteNote}
          />
        })
      }
    </div>
  );
}

export default App;

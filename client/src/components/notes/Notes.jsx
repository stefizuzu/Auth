import React, { Component } from "react";
import Note from "./Note";
import Axios from "axios";
import userData from "../login/userData_Client";

class Notes extends Component {

    state = {
        notes: [],
        newnote:"",
    };

    handleDelete = (noteId) => {
        console.log("Note deleted! ", noteId);  
        Axios.post(`http://localhost:3001/deleteNote`, { noteId : noteId })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        const notes = this.state.notes.filter(c => c.noteId !== noteId);
        this.setState({notes});
    } 

    addNote () {
        const notes = [...this.state.notes];
        const e = document.getElementById("newnote").value;

        Axios.post(`http://localhost:3001/newNote`, { note : e })
        .then(res => {
            console.log(res);
            console.log(res.data);
         })

        notes.push({noteId: this.state.notes.length+5, note : e});
        this.setState({notes});
        console.log("Note added! ");
    } 

    componentDidMount(){
        const notes = [...userData.notes];
        console.log("Notes",notes);
        this.setState({notes});
    }

  render() {
    const { notes, onDelete } = this.props;
    return (
      <div>
        <br />
        <form>
          <input type="text" id ="newnote" name="newnote" placeholder="Type something..." />
          <button className="btn btn-dark" type="button" onClick = {() => this.addNote()}>Add Note</button>
        </form>
        <br />
        <div style={{display:'flex'}}>  
            {this.state.notes.map((note) => (
            <Note
                key={note.noteId}
                onDelete={this.handleDelete}
                note={note}
            >
            </Note>
            ))}
        </div>
      </div>
    );
  }
}

export default Notes;
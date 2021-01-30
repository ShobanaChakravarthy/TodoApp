import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import './App.css';
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
function App() {
  const[todos,setTodos] = useState([]);
  const[inp,setInp] = useState("");
  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      // this will give the array from object // console.log(snapshot.docs.map(doc=>doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    }) 
  }, [])
  const handleChange=(e)=>setInp(e.target.value);
  const handleClick=(e)=>{
    e.preventDefault();
    //to add it to db
    console.log(firebase.firestore.FieldValue.serverTimestamp());
    db.collection('todos').add({
      todo: inp,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //to add to state in our local maching
    //setTodos([...todos,inp])
    setInp(""); //clear up input field after adding it to db
  };
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <br/>
      <form>
        <FormControl>
          <InputLabel> Write a ToDo</InputLabel>
          <Input type="text" onChange={handleChange} value={inp}/>
        </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button disabled={!inp} variant="contained" color="primary" type="submit"onClick={handleClick}>Add Todo</Button>
        <ul>{todos.map(todo=>(<Todo todo={todo}/>))}</ul>
      </form>
    </div>
  );
}

export default App;

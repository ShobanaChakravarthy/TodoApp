import { Button, FormControl, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import db from "./firebase";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme)=>({
    paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding:theme.spacing(2,4,3)
    },
    root:{
        textAlign: 'center',
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
    }

}))

function Todo(props) {
    const classes=useStyles();
    const[open,setOpen]=useState(false);
    const[inpp,setInpp]=useState('');
    
    const updateField=(e)=>{
        db.collection('todos').doc(props.todo.id).set({
            todo: inpp
        },{merge:true})
        setOpen(false);
    }
    return (
        <>
        <Modal open={open} onClose={e=>setOpen(false)}>
            <div className={classes.paper}>
                <h1>Modal</h1>
                <form>
                    <FormControl>
                        <InputLabel>Todo</InputLabel>
                        <Input type="text" placeholder={props.todo.todo} onChange={e=>setInpp(e.target.value)} value={inpp}/>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit"onClick={updateField}>Update</Button>
                </form>
            </div>
        </Modal>
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <EventNoteIcon></EventNoteIcon>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline"></ListItemText>
                <ListItemSecondaryAction>
                    <EditIcon onClick={e=>setOpen(true)}></EditIcon>
                    <DeleteIcon onClick={event => db.collection('todos').doc(props.todo.id).delete() }/>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
        </>
    )
}

export default Todo

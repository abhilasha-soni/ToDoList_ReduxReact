import React from "react";
import { useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { actions } from "../redux/slice/toDoSlice";

export default function ToDoList() {
  const [description, setDescription] = useState("");
  const [task, setTask] = useState("");

  const toDoValue = useSelector((state: RootState) => state.toDo);

  const dispatch = useDispatch();

  return (
    <div>
      <Container maxWidth="xs">
        <Typography style={{ textAlign: "center" }} variant="h3">
          To Do List{" "}
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="To Do Item"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <TextField
          variant="outlined"
          type="date"
          fullWidth
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            dispatch(actions.addToDo(description, task));
            setDescription("");
          }}
        >
          Add Item
        </Button>
        <List>
          {toDoValue.map((tds) => (
            <ListItem key={tds.id}>
              <ListItemText
                style={{
                  textDecoration: tds.completed ? "line-through" : "none",
                }}
              >
                {tds.description}
              </ListItemText>
              <ListItemText>{tds.task}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    dispatch(actions.removeToDo(tds.id));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Checkbox
                  edge="end"
                  value={tds.completed}
                  onChange={() => {
                    dispatch(
                      actions.setToDoStatus({
                        completed: !tds.completed,
                        id: tds.id,
                      })
                    );
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

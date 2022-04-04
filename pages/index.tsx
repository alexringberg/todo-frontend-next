import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { GetTodoListAPI, AddTodoAPI, UpdateTodoAPI, DeleteTodoAPI } from '../services/TodoService';
import { ITodo } from '../models/Todos';
import styled from "styled-components"

const Home: NextPage = () => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
      setTodos(await GetTodoListAPI())
      setNewTodoText("")
  };

  const AddTodo = async (e : Event) => {
    e.preventDefault()
    if (newTodoText.trim() === "" || !newTodoText) {
      return
    }
    
    const res = await AddTodoAPI(newTodoText)
    console.log(res)

    GetData()
  };

  const UpdateTodo = async (index: number) => {
    const newTodos = [...todos];
    const todoToUpdate = newTodos[index];
    todoToUpdate.completed = !todoToUpdate.completed;
    newTodos[index] = todoToUpdate;

    await UpdateTodoAPI(todoToUpdate)
    await GetData()
  };

  const DeleteTodo = async (index: number) => {
    const newTodos = [...todos];
    const todoToDelete = newTodos[index].id;
    newTodos.splice(index, 1);
    setTodos(newTodos);

    await DeleteTodoAPI(todoToDelete)
  };

  const GetTodos = todos
    .map((todo, index) => {
      return (
        <TodoListItem key={index}>
          <TodoListItemInput
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
              UpdateTodo(index);
            }}
          ></TodoListItemInput>
          <TodoListItemP
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.description}
          </TodoListItemP>
          <TodoListItemButton
            onClick={(e) => {
              DeleteTodo(index);
            }}
          >
            X
          </TodoListItemButton>
        </TodoListItem>
      );
    })?? null

  return (
    <TodoListDiv>
      <TodoListTitle>Ringberg ToDo List</TodoListTitle>
      <TodoListForm onSubmit={(e : any) => { AddTodo(e) }}>
        <TodoListFormItem type="text" name="newTodo" value={newTodoText}onChange={(e) => setNewTodoText(e.target.value)}></TodoListFormItem>
        <TodoListFormButton>Add</TodoListFormButton>
      </TodoListForm>
      <TodoList>{GetTodos}</TodoList>
    </TodoListDiv>
  );
}

const TodoListDiv = styled.div`
  max-width: 350px;
  max-height: fit-content;
  min-height: 300px;
  padding: 25px;
  transform: translateY(-50%);
  margin: 50vh auto;
  border-radius: 15px;
  box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(95, 197, 192);
`

const TodoListTitle = styled.h1`
  font-size: 25px
`

const TodoListForm = styled.form`
  min-width: 100%;
  display: flex;
  justify-content: space-between;
`

const TodoListFormItem = styled.input`
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 5px 10px;
  width: 80%;
`

const TodoListFormButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  background-color: deepskyblue;
`

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 100%;
  padding: 5px
`

const TodoListItem = styled.li`
  list-style-type: none;
  width: 100%;
  display: flex;
`

const TodoListItemInput = styled.input`
  width: 10%;
  background-color: brown;
`

const TodoListItemP = styled.p`
  width: 90%;
  font-size: medium;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-top: 2px;
`

const TodoListItemButton = styled.button`
  border: transparent;
  color:rgb(167, 167, 167);
  font-weight: 800;
  border-radius: 5px;
  background: rgba(56, 54, 54, 0.863);
  width: 9%;
  max-height: 25px;
`
export default Home

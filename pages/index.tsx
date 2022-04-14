import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import { GetTodoListAPI, AddTodoAPI, UpdateTodoAPI, DeleteTodoAPI } from '../services/TodoService';
import { ITodo } from '../models/Todos';
import styled from "styled-components"
import Todos from '../components/Todos';

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

  return (
    <TodoListDiv>
      <TodoListTitle>Ringberg ToDo List</TodoListTitle>
      <TodoListForm onSubmit={(e : any) => { AddTodo(e) }}>
        <TodoListFormItem type="text" name="newTodo" value={newTodoText}onChange={(e) => setNewTodoText(e.target.value)}></TodoListFormItem>
        <TodoListFormButton>Add</TodoListFormButton>
      </TodoListForm>
      <TodoList>
        <Todos todos={todos} updateTodo={UpdateTodo} deleteTodo={DeleteTodo}></Todos>
      </TodoList>
    </TodoListDiv>
  );
}

const TodoListDiv = styled.div`
  max-width: 360px;
  max-height: fit-content;
  min-height: 300px;
  padding: 25px;
  transform: translateY(-50%);
  margin: 45vh auto;
  border-radius: 15px;
  box-shadow: 5px 5px 15px -5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #393f57;
`

const TodoListTitle = styled.h1`
  font-size: 35px;
  color: #7fffd4;
  padding: 2px;
  margin-top: 0px;
  text-align: center;
  font-weight: 200;
  font-family: 'Roboto Condensed';
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
  margin-left: 10px;
`

const TodoListFormButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  background-color: #ffa07a;
  font-weight: 600;
`

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 100%;
  padding: 5px;
  margin-right: 5px;
`

export default Home

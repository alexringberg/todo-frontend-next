import { ITodo } from "../models/Todos";
import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  todos: ITodo[]
  isLoading: boolean
  toggleCompleted: (e: any, index: number) => void
  deleteTodo: (index: number) => void
  updateTodo: (index: number) => void
}
export interface ItemProps {
  completed: boolean
}

const Todos = ({ todos, isLoading, toggleCompleted, deleteTodo, updateTodo }: Props): any => {
  todos.sort((a,b) => {
    if(a.completed === b.completed){
      return a.id - b.id
    }
    if(a.completed){
      return 1
    }
    return -1
  })

  if(isLoading){
    return (
      <WaitText>Please wait while backend api spins up...</WaitText>
    )
  }

  return todos.map((todo, index) => {
    return (
      <TodoListItem key={index}>
        <TodoListItemInput
          type="checkbox"
          checked={todo.completed}
          onChange={(e: any) => { toggleCompleted(e, index) }}
        ></TodoListItemInput>
        <TodoListItemP completed={todo.completed}>
          {todo.description}
        </TodoListItemP>
        <TodoListEditButton onClick={(e) => { updateTodo(index) }}><FontAwesomeIcon icon={faPencil} size="xs" />
        </TodoListEditButton>
        <TodoListItemButton onClick={(e) => { deleteTodo(index) }}>X</TodoListItemButton>
      </TodoListItem>
    )
  })
}

const WaitText = styled.p`
  color: #7fffd4;
  font-size: 35;
  text-align: center;
  font-weight: 800;
`

const TodoListItem = styled.li`
  list-style-type: none;
  width: 100%;
  display: flex;
  padding: 5px;
`;

const TodoListItemInput = styled.input`
  width: 5%;
  margin-top: 4px;
`;

const TodoListItemP = styled.p`
  text-decoration: ${(props: ItemProps) => props.completed ? "line-through" : ""};
  width: 90%;
  font-size: 15px;
  text-align: left;
  color: #7fffd4;
  font-weight: 300;
  margin: 0px;
`;

const TodoListItemButton = styled.button`
  border: transparent;
  color: #000000;
  font-weight: 700;
  border-radius: 7px;
  background: #e26a6a;
  width: 9%;
  max-height: 20px;
  height: 20px;
  width: 25px;
  line-height: 20px;
  box-sizing: border-box;
  margin-left: 2px;
`;

const TodoListEditButton = styled.button`
  border: transparent;
  color: #000000;
  font-weight: 700;
  border-radius: 7px;
  background: #f4d03f;
  width: 9%;
  max-height: 20px;
  height: 20px;
  width: 25px;
  line-height: 20px;
  box-sizing: border-box;
`

export default Todos;

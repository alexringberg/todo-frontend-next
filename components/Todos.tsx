import { ITodo } from "../models/Todos";
import styled from "styled-components";
import { faPencil } from "@fortawesome/free-solid-svg-icons" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { device } from '../models/Breakpoints'

interface Props {
  todos: ITodo[]
  isLoading: boolean
  toggleCompleted: (e: any, index: number) => void
  deleteTodo: (index: number) => void
  updateTodo: (index: number) => void
}

interface IconProps {
  iconSize: string
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
        <TodoListEditButton onClick={(e) => { updateTodo(index) }}><StyledEditIcon icon={faPencil} />
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
  align-items: center;
`;

const TodoListItemInput = styled.input`
  @media ${device.mobileL} {
    margin-top: 4px;
    margin-left: 7px;
    transform: scale(1.0);
  }

  @media ${device.tablet} {
    margin-top: 8px;
    margin-left: 15px;
    margin-right: 7px;
    transform: scale(1.5);
  }

  @media ${device.laptopL} {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 15px;
    transform: scale(2.0);
  }
`;

const TodoListItemP = styled.p`
  text-decoration: ${(props: ItemProps) => props.completed ? "line-through" : ""};
  width: 90%;  
  text-align: left;
  color: #7fffd4;
  font-weight: 300;
  margin: 0px;

  @media ${device.mobileL} {
    font-size: 15px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptopL} {
    font-size: 25px;
  }
`;

const TodoListItemButton = styled.button`
  border: transparent;
  color: #000000;
  font-weight: 700;
  border-radius: 7px;
  background: #e26a6a;
  box-sizing: border-box;
  margin-left: 2px;

  @media ${device.mobileL} {
    height: 20px;
    width: 25px;
    line-height: 20px;
  }

  @media ${device.tablet} {
    height: 30px;
    width: 35px;
    line-height: 20px;
  }

  @media ${device.laptopL} {
    height: 40px;
    width: 45px;
    line-height: 20px;
    font-size: 18px;
  }
`;

const TodoListEditButton = styled.button`
  border: transparent;
  color: #000000;
  font-weight: 700;
  border-radius: 7px;
  background: #f4d03f;
  line-height: 20px;
  box-sizing: border-box;

  @media ${device.mobileL} {
    height: 20px;
    width: 25px;
    line-height: 20px;
  }

  @media ${device.tablet} {
    height: 30px;
    width: 35px;
    line-height: 20px;
  }

  @media ${device.laptopL} {
    height: 40px;
    width: 45px;
    line-height: 20px;
  }
`

const StyledEditIcon = styled(FontAwesomeIcon)`

`

export default Todos;

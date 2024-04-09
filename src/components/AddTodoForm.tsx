'use client';
import React, { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Checkbox } from '@nextui-org/react';
import { addTodo, setMoveLocationTodo, } from '@/redux/features/todo-slice';
import { BsFillTrashFill } from 'react-icons/bs';

const AddTodoForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todoRef = useRef<string | null>(null); // Menggunakan useRef untuk todo
  const errorMessageRef = useRef<string | null>(null); // Menggunakan useRef untuk errorMessage

  const handleSubmit = () => {
    const todo = todoRef.current;
    if (!todo) {
      errorMessageRef.current = 'Task name is required';
      return;
    }
    dispatch(addTodo({ id: Date.now(), name: todo, done: false }));
    todoRef.current = ''; // Mengubah nilai menggunakan ref
    errorMessageRef.current = null; // Mengubah nilai menggunakan ref
  };

  const { list } = useSelector((state: RootState) => state.todoReducer);

  const handleMoveAndRemove = (id: number, name: string) => {
    // Kirim nilai todo.name ke Redux (Anda dapat menggantinya sesuai kebutuhan)
    console.log(id, name);
    dispatch(setMoveLocationTodo({ id: id, name: name, jumlah: 0 }));
    // Di sini Anda bisa melakukan apa pun yang ingin Anda lakukan ketika tombol diklik
  };

  return (
    <>
      <Card className="p-4">
        {/* <CardHeader>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Todo List</p>
          <p className="text-small text-default-500">Manage your tasks</p>
        </div>
      </CardHeader> */}
        <CardBody>
          {list.map((todo) => (
            <div className="flex mb-2 justify-center" key={todo.id}>
              <div>
                <button className="font-bold pb-1 px-4 rounded" onClick={() => handleMoveAndRemove(todo.id, todo.name)}>
                  {todo.name}
                </button>
              </div>
            </div>
          ))}
          <div className="flex mt-8 justify-center font-bold">
            (List bahan-bahan)
          </div>
        </CardBody>


        <CardHeader>
          <div className="flex flex-col">
            <p className="text-lg font-bold">Add Todo</p>
            <p className="text-small text-default-500">Type and save your task</p>
          </div>
        </CardHeader>
        <CardBody>
          <Input
            isRequired
            label="Task Name"
            value={todoRef.current === null ? undefined : todoRef.current}
            onValueChange={(newValue) => (todoRef.current = newValue)} // Mengubah nilai menggunakan ref
            errorMessage={errorMessageRef.current}
            variant="bordered"
          />
        </CardBody>

        <CardFooter>
          <Button color="primary" variant="solid" onClick={() => handleSubmit()}>
            Add
          </Button>
        </CardFooter>
      </Card>

    </>


  );
};

export default AddTodoForm;

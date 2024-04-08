// import { SetMoveremoveTodo } from "@/redux/features/todo-slice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { Checkbox } from "@nextui-org/react";
// import { BsFillTrashFill } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";


// export const ButtonData: React.FC = (todo) => {
//     const { moveLocationTodo,tatacara,StatusKlikCard } = useSelector((state: RootState) => state.todoReducer);
//   const dispatch = useDispatch<AppDispatch>();
//     const handleMoveRemoveDataMove = (id:number,name:string,done:boolean) => {
//         // Kirim nilai todo.name ke Redux (Anda dapat menggantinya sesuai kebutuhan)
//         console.log(id,name,done);
//         dispatch(SetMoveremoveTodo({ id: id, name: name, done: done }));
//         // Di sini Anda bisa melakukan apa pun yang ingin Anda lakukan ketika tombol diklik
//       };
//     return (
//         <div className="flex space-x-1">
//           {/* <div className="my-auto">
//             <Checkbox
//               isSelected={todo.done}
//               onChange={() => dispatch(toggleTodo(todo.id))}
//             /> 
//           </div> */}
    
//           <div className="my-auto">
//             <BsFillTrashFill
//               className="cursor-pointer text-[18px]"
//               onClick={() => handleMoveRemoveDataMove(todo.id, todo.name, todo.done)}
//             /> 
//           </div>
//         </div>
//       );
// }
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-2 p-5">
    <div className="md:col-span-5 col-span-12 pl-5 md:pl-0"> {/* Menambahkan padding kiri untuk AddTodoForm */}
      <div  className="pr-2 rounded-lg">
      <AddTodoForm /> {/* Menambahkan jarak samping dan background pada AddTodoForm */}
      </div>
     
    </div>

    <div className="md:col-span-7 col-span-12 pr-5 md:pr-0"> {/* Menambahkan padding kanan untuk TodoList */}
    <div  className="pl-2 rounded-lg">
    <TodoList  /> {/* Menambahkan jarak samping dan background pada TodoList */}
    </div>
    
    </div>
  </div>
  );
}

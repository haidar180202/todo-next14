// Importing necessary dependencies
import { createSlice } from '@reduxjs/toolkit';

// Defining the type for Todo
type Todo = {
  id: number;
  name: string;
  
};

type TataCara = {
  id: number;
  keterangan : string;
};

type Todo2 = {
  id: number;
  name: string;
  
  jumlah: number;

};

// Defining the type for TodoState
type TodoState = {
  list: Todo[];
  moveLocationTodo: Todo2[];
  tatacara: TataCara[];
  StatusKlikCard:{ status: Boolean };
  StatusKlikManipulasiTatacara:{ status: Boolean };
  StatusKlikManipulasiJumlahBahanResep:{ status: Boolean };

   // New field for tatacara
   // New field to hold the selected todo for move location
};

// Defining the initial state
const initialState: TodoState = {
  list: [
    {
      id: 1,
      name: 'Apel',
      
    },
    {
      id: 2,
      name: 'Garam',
      
    },
    {
      id: 3,
      name: 'Tepung Terigu',
      
    },
  ],
  moveLocationTodo: [
    {
      id: 4,
      name: 'Daging Sapi',
      
      jumlah: 0, // Default value for jumlah
    }
  ],
  tatacara:[
    {
      id: 5,
      keterangan: 'Potong Semua Bahan'
    }
  ],

  StatusKlikManipulasiJumlahBahanResep: { status: false },
  StatusKlikCard: { status: false },
  StatusKlikManipulasiTatacara: { status: false },
};

// Creating the todo slice
export const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Other existing reducers
    addTodo: (state, action) => { // for add data in todo
      const todo = state.list.find((todo) => todo.name === action.payload.name);
      if (!todo) {
        state.list.push(action.payload);
      }
    },

    setManipulateStatusCard : (state, action) => { // for add data in todo
      const StatusKlikCard = state.StatusKlikCard.status !== action.payload;
      if (StatusKlikCard) {
        state.StatusKlikCard.status = action.payload;
      }
    },

    setManipulateStatusJumlahBahan : (state, action) => { // for add data in todo
      const StatusKlikCardJumlahBahan = state.StatusKlikManipulasiJumlahBahanResep.status !== action.payload;
      if (StatusKlikCardJumlahBahan) {
        state.StatusKlikManipulasiJumlahBahanResep.status = action.payload;
      }
    },

    setManipulateTatacara : (state, action) => { // for add data in todo
      const StatusKlikManipulasiTatacara = state.StatusKlikManipulasiTatacara.status !== action.payload;
      if (StatusKlikManipulasiTatacara) {
        state.StatusKlikManipulasiTatacara.status = action.payload;
      }
    },

    setMoveLocationTodo: (state, action) => { // add for new location
      // Menghapus todo dari list dan menambahkannya ke moveLocationTodo
      const todo2 = state.moveLocationTodo.find((todo2) => todo2.name === action.payload.name);
      const todoIndex = state.list.findIndex(todo => todo.id === action.payload.id);
      if (todoIndex !== -1 && !todo2) {
        state.moveLocationTodo.push(action.payload);
        state.list.splice(todoIndex, 1);
      }

    },

    SetMoveremoveTodo: (state, action) => {
      const todoIndex = state.list.find((todo) => todo.name === action.payload.name);
      const todo2 = state.moveLocationTodo.findIndex(todo2 => todo2.id === action.payload.id);
      if (todo2 !== -1 && !todoIndex) {
        state.list.push(action.payload);
        state.moveLocationTodo.splice(todo2, 1);
      }

    },

    // setMoveUpdateData:
    setMoveUpdateData: (state, action) => {
      const todo2 = state.moveLocationTodo.find(todo2 => todo2.id === action.payload.id);
      if (todo2) {
        todo2.jumlah = action.payload.jumlah;
      }
    },

    setMoveDataAddForTatacara: (state, action) => {
      const newId = Math.max(...state.tatacara.map(item => item.id), 0) + 1;
      const keterangan = action.payload;
      if (keterangan !== '') {
        state.tatacara.push({ id: newId, keterangan });
      }
    },

    setMoveUpdateKeteranganTatacaraData: (state, action) => {
      const todo2 = state.tatacara.find(todo2 => todo2.id === action.payload.id);
      if (todo2) {
        todo2.keterangan = action.payload.keterangan;
      }

    },

    SetremoveTatacara: (state, action) => {
      // const todoIndex = state.tatacara.find((todo) => todo.name === action.payload.name);
      const tatacara = state.tatacara.findIndex(tatacara => tatacara.id === action.payload.id);
      if (tatacara !== -1 ) {
        // state.list.push(action.payload);
        state.tatacara.splice(tatacara, 1);
      }

    },
    

    
  },
});

// Exporting actions and reducer
// removeTodo, toggleTodo,
export const { addTodo, setMoveLocationTodo,SetMoveremoveTodo,setMoveUpdateData,setMoveDataAddForTatacara,setManipulateStatusCard,setManipulateTatacara,setManipulateStatusJumlahBahan,setMoveUpdateKeteranganTatacaraData,SetremoveTatacara } = todo.actions;
export default todo.reducer;

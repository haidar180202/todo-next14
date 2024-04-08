'use client';
import React, { useRef, useEffect, useReducer } from 'react';
import { Card, CardHeader, CardBody,Input } from '@nextui-org/react';
import { SetMoveremoveTodo, setManipulateStatusCard, setManipulateStatusJumlahBahan, setManipulateTatacara, setMoveDataAddForTatacara, setMoveUpdateData, setMoveUpdateKeteranganTatacaraData, } from '@/redux/features/todo-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';


const TodoList: React.FC = () => {
  const clickedIndexRef = useRef(null); // for setting konfigurasi saat card klik bagian bahan maka akan difungsikan untuk hide dan show button
  const clickedIndexRefForEditTatacara = useRef(null); // for setting edit status konfigurasi saat data keterngan tatacara di klik maka bagian keterangan tatacara dapat di ubah selalu 
  const clickedIndexRefForEditJumlah = useRef(null); // for setting edit status konfigurasi saat icon edit di klik bagian jumlah bahan dapat diubah

  const { moveLocationTodo, tatacara, StatusKlikCard, StatusKlikManipulasiTatacara, StatusKlikManipulasiJumlahBahanResep } = useSelector((state: RootState) => state.todoReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleMoveRemoveDataMove = (id: number, name: string) => {
    // Kirim nilai todo.name ke Redux (Anda dapat menggantinya sesuai kebutuhan)
    console.log(id, name);
    dispatch(SetMoveremoveTodo({ id: id, name: name }));
    // Di sini Anda bisa melakukan apa pun yang ingin Anda lakukan ketika tombol diklik
  };

  const handleKeyUpdateJumlahForFirst = (event: any, id: number) => {
    if (event.key === 'Enter' && event.target.value >= 1 || (event.type === 'blur' && event.target.value >= 1)) {
      let weightInput = event.target.value;
      dispatch(setMoveUpdateData({ id: id, jumlah: weightInput }));

      console.log(weightInput, id);
      // Clear the input after dispatching
    }
  };

  const handleKeyUpdateJumlah = (event: any, id: number) => {
    if (event.key === 'Enter' && event.target.value >= 1 || (event.type === 'blur' && event.target.value >= 1)) {
      let weightInput = event.target.value;
      dispatch(setMoveUpdateData({ id: id, jumlah: weightInput }));
      dispatch(setManipulateStatusJumlahBahan(false));

      console.log(weightInput, id);
      // Clear the input after dispatching
    }
  };

  const handleAddKeterangan = (event: any) => {
    if (event.key === 'Enter' && event.target.value !== "" || (event.type === 'blur' && event.target.value !== "")) {
      const input = event.target;
      const keterangan = input.value.trim();

      if (keterangan !== '') {
        dispatch(setMoveDataAddForTatacara(keterangan));
        input.value = '';
      }
    }
  };

  const handleValidasiStatusButtonClick = (index: any) => { // fungsi untuk setting perubahan status saat card bahan diklik maka akan menampilkan buttonnya lalu menghide berdasarkan waktu tertentu secara otomatis saat tidak di klik
    clickedIndexRef.current = index;
    dispatch(setManipulateStatusCard(true));

    // Set timeout untuk menyembunyikan kembali data setelah 3 menit
    setTimeout(() => {
      dispatch(setManipulateStatusCard(false));
      clickedIndexRef.current = null; // Reset clickedIndexRef setelah 3 menit
    }, 2000); // 180000 milidetik = 3 menit
  }


  const handleForSettingValidasiStatusJumlah = (index: any) => { // fungsi untuk setting perubahan status saat card bahan diklik maka akan menampilkan buttonnya lalu menghide berdasarkan waktu tertentu secara otomatis saat tidak di klik
    clickedIndexRefForEditJumlah.current = index;
    dispatch(setManipulateStatusJumlahBahan(true));
    // Set timeout untuk menyembunyikan kembali data setelah 3 menit
    // 180000 milidetik = 3 menit
  }

  const handleForSettingValidasiStatusTatacara = (index: any) => { // fungsi untuk setting perubahan status saat card bahan diklik maka akan menampilkan buttonnya lalu menghide berdasarkan waktu tertentu secara otomatis saat tidak di klik
    clickedIndexRefForEditTatacara.current = index;
    dispatch(setManipulateTatacara(true));
    // Set timeout untuk menyembunyikan kembali data setelah 3 menit
    // 180000 milidetik = 3 menit
  }

  const handleUpdateTatacara = (event: any, id: any) => { // fungsi untuk setting perubahan status saat card bahan diklik maka akan menampilkan buttonnya lalu menghide berdasarkan waktu tertentu secara otomatis saat tidak di klik
    if (event.key === 'Enter' && event.target.value !== "" || event.type === 'blur' && event.target.value !== "") {
      let weightInput = event.target.value;
      dispatch(setMoveUpdateKeteranganTatacaraData({ id: id, keterangan: weightInput }));
      dispatch(setManipulateTatacara(false));
    }

  }


  return (
    <Card className="p-4">
      <CardHeader className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-bold text-center">Nama Resep (Input)</p>
        </div>
      </CardHeader>

      <CardBody>
        <p className="text-md font-bold">Bahan :</p>
        {moveLocationTodo.map((todo, index) => (
          <button key={index} onClick={() => handleValidasiStatusButtonClick(index)}>
            <div className="flex mb-2 justify-between" key={todo.id}>
              <div>

                <p>
                  {todo.jumlah === 0 ? (<input type="number" min={1} className="mx-2 w-10 py-2 mt-1 rounded bg-slate-300 " style={{ textAlign: 'center' }} onKeyDown={(event) => handleKeyUpdateJumlahForFirst(event, todo.id)} onBlur={(event) => handleKeyUpdateJumlahForFirst(event, todo.id)} defaultValue={todo.jumlah >= 1 ? todo.jumlah : ''} />) : StatusKlikManipulasiJumlahBahanResep.status === true && clickedIndexRefForEditJumlah.current === index ? (<input type="number" min={1} className="mx-2 w-10 py-2 mt-1 rounded bg-slate-300 " style={{ textAlign: 'center' }} onKeyDown={(event) => handleKeyUpdateJumlah(event, todo.id)} onBlur={(event) => handleKeyUpdateJumlah(event, todo.id)} defaultValue={todo.jumlah >= 1 ? todo.jumlah : ''} />) : (<>{todo.jumlah}</>)}{' '} kg <span className='ml-3'>{todo.name}</span>
                </p>
              </div>

              {StatusKlikCard.status === true && clickedIndexRef.current === index && (
                <div className="flex space-x-1">
                  <div className="my-auto">
                    <BsPencil
                      className="cursor-pointer text-[18px] mr-3"
                      onClick={() => handleForSettingValidasiStatusJumlah(index)}
                    // onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                  </div>
                  <div className="my-auto">
                    <BsFillTrashFill
                      className="cursor-pointer text-[18px]"
                      onClick={() => handleMoveRemoveDataMove(todo.id, todo.name)}
                    />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}

        <div>
          Tata Cara :
          <div className="my-auto">

            {moveLocationTodo.length > 0 && tatacara.map((dd, index) => (
              <div key={dd.id}>
                {StatusKlikManipulasiTatacara.status === true && clickedIndexRefForEditTatacara.current === index ? (
                  <input
                    className='pl-2 py-1 mt-1 rounded bg-slate-300'
                    type="text"
                    defaultValue={dd.keterangan} // Mengisi nilai default input dengan keterangan sebelumnya
                    onBlur={(event) => handleUpdateTatacara(event, dd.id)} // Menangani update saat input blur
                    onKeyDown={(event) => { handleUpdateTatacara(event, dd.id) }

                    }
                  />
                ) : (
                  <button onClick={() => handleForSettingValidasiStatusTatacara(index)}>
                    {index + 1}. {dd.keterangan}
                  </button>
                )}

              </div>
            ))}
            <input type={moveLocationTodo.length === 0 ? 'disabled' : 'text'} className="pl-2 py-1 mt-2 rounded bg-slate-300" disabled={moveLocationTodo.length === 0} onKeyDown={(event) => handleAddKeterangan(event)} onBlur={(event) => handleAddKeterangan(event)} />
          </div>
        </div>

      </CardBody>
    </Card>
  );
};

export default TodoList;

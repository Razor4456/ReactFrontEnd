import React, { useState } from "react";
import { useAddStuffMutation } from "../../service/stuffservice/stuffapi";

function AddStuff() {
    const [nama_barang,setNamaBarang] = useState('');
    const [jumlah_barang,setJumlahBarang] = useState('');
    const [harga,setHaBarang] = useState('');
    const [addStuff,{isLoading, isSuccess, error}] = useAddStuffMutation('');

    const AddStuffHandler = async (e) => {
        e.preventDefault();
        try{
            await addStuff({
                nama_barang,
                jumlah_barang: parseInt(jumlah_barang),
                harga: parseInt(harga),
            });
            console.log('Barang')
            setNamaBarang('');
            setJumlahBarang('');
            setHaBarang('');
        } catch (err) {
            console.error('Gagal Menambahkan Barang :', err);
        }
    };

    return (
        <form onSubmit={AddStuffHandler}>
            <h2>Tambah Barang</h2>
            <input
            type="text"
            placeholder="Nama Barang"
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
            />

            <input
            type="number"
            placeholder="Jumlah barang"
            value={jumlah_barang}
            onChange={(e) => setJumlahBarang(e.target.value)}
            required 
            />

            <input
            type="number"
            placeholder="Harga"
            value={harga}
            onChange={(e) => setHaBarang(e.target.value)}
            required 
            />

        </form>
    );
}

export default AddStuff;
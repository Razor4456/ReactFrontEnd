import React, { useState } from "react";
import { useAddStuffMutation } from "../../service/stuffservice/stuffapi";
import Stuffaddstyles from './stuffadd.module.scss'

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
        <form className={`${Stuffaddstyles.StuffForm}`} onSubmit={AddStuffHandler}>
            <h2 className={`${Stuffaddstyles.Stufftitle}`}>Tambah Barang</h2>
            <input
            className={`${Stuffaddstyles.StuffInput}`}
            type="text"
            placeholder="Nama Barang"
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
            />

            <input
            className={`${Stuffaddstyles.StuffInput}`}
            type="text"
            placeholder="Jumlah barang"
            inputMode="numeric"
            pattern="[0-9]*"
            value={jumlah_barang}
            onChange={(e => {
                const value = e.target.value;
                if(/^\d*$/.test(value)){
                    setJumlahBarang(value);
                }
            })}
            required 
            />

            <input
            className={`${Stuffaddstyles.StuffInput}`}
            type="text"
            placeholder="Harga"
            inputMode="numeric"
            pattern="[0-9]*"
            value={harga}
            onChange={(e => {
                const value = e.target.value;
                if(/^\d*$/.test(value)){
                    setHaBarang(value);
                }
            })}
            required 
            />
            <div className={`${Stuffaddstyles.parent}`}>
            <button className={`${Stuffaddstyles.StuffButton}`} type="submit" disabled={isLoading}>
                {isLoading ? 'Menambahkan...' : 'Tambah Barang'}
            </button>
            </div>

            {isSuccess && <p className={`${Stuffaddstyles.StuffMessage}`}> Barang berhasil ditambahkan </p>}
            {error && <p className={`${Stuffaddstyles.StuffMessage}`}> gagal : {error.message} </p>}
        </form>
    );
}

export default AddStuff;
import React, { useState } from "react";
import { useAddStuffMutation } from "../../service/stuffservice/stuffapi";
import Stuffaddstyles from './stuffadd.module.scss'
import {Alert} from 'antd';

function AddStuff() {
    const [nama_barang,setNamaBarang] = useState('');
    const [jumlah_barang,setJumlahBarang] = useState('');
    const [harga,setHargaBarang] = useState('');
    const [addStuff,{isLoading}] = useAddStuffMutation('');
    const [successMsg,setSuccessMsg] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    const AddStuffHandler = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        try{
            await addStuff({
                nama_barang,
                jumlah_barang: parseInt(jumlah_barang),
                harga: parseInt(harga),
            }).unwrap();


            setSuccessMsg('Barang Berhasil Di tambahkan')
            console.log('Barang')
            setNamaBarang('');
            setJumlahBarang('');
            setHargaBarang('');
        } catch (err) {
            console.log("message",'Gagal Menambahkan Barang');
            setErrorMsg('Gagal menambahkan barang')
            // console.error('Gagal Menambahkan barang');
        }
    };

    return (
        <>
        {successMsg && <Alert className = {Stuffaddstyles.smallAlert} message = {successMsg} type = "success" />}
        {errorMsg && <Alert className = {Stuffaddstyles.smallAlert} message = {errorMsg} type = "error" />}
        
        <h2 className={Stuffaddstyles.Stufftitle}>Tambah Barang</h2>

        <form className={Stuffaddstyles.StuffForm} onSubmit={AddStuffHandler}>
            <p>Nama Barang</p>
            <input
            className={Stuffaddstyles.StuffInput}
            type="text"
            placeholder="Nama Barang"
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
            />

            <p>Jumlah Barang</p>
            <input
            className={Stuffaddstyles.StuffInput}
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
            />

            <p>Harga Barang</p>
            <input
            className={Stuffaddstyles.StuffInput}
            type="text"
            placeholder="Harga"
            inputMode="numeric"
            pattern="[0-9]*"
            value={harga}
            onChange={(e => {
                const value = e.target.value;
                if(/^\d*$/.test(value)){
                    setHargaBarang(value);
                }
            })}
            />
            <div className={Stuffaddstyles.parent}>
            <button className={Stuffaddstyles.StuffButton} type="submit" disabled={isLoading}>
                {isLoading ? 'Menambahkan...' : 'Tambah Barang'}
            </button>
            </div>
        </form>
        </>
    );
}

export default AddStuff;
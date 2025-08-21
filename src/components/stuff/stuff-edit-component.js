import {React,useEffect,useState} from "react";
import { useEditStuffMutation, useGetStuffByIdQuery } from "../../service/stuffservice/stuffapi";
import editStyle from "./stufftedit.module.scss";
import {useParams} from "react-router-dom";

function EditStuff(){
    const {id} = useParams();
    const {data: StuffData, isLoading: isFetching} = useGetStuffByIdQuery(id)
    const [nama_barang,setNamaBarang] = useState('');
    const [jumlah_barang,setJumlahBarang] = useState('');
    const [harga,setHargaBarang] = useState('');
    const [editStuff,{isLoading}] = useEditStuffMutation('')

    console.log("StuffData",StuffData);
    console.log("id",id);

    useEffect(() => {
        if(StuffData) {
            setNamaBarang(StuffData.Data.nama_barang || '')
            setJumlahBarang(StuffData.Data.jumlah_barang || '')
            setHargaBarang(StuffData.Data.harga || '')
        }
    }, [StuffData]);

    const EditStuffHandler = async(e) =>{
        e.preventDefault();

        const updateData = {
            nama_barang,
            jumlah_barang: parseInt(jumlah_barang) ||0 ,
            harga: parseInt(harga) ||0,
        };

        try{
            await editStuff({id, data: updateData});
            alert('Barang berhasil Di Update');
        } catch (err) {
            alert('Gagal update Barang');
        }
    };

    return (
        <>
        <h2 className={editStyle.Stufftitle}>Edit Barang</h2>
        <form className={editStyle.StuffForm} onSubmit={EditStuffHandler}>
            <p>Nama Barang</p>
            <input
            className={editStyle.StuffInput}
            type="text"
            placeholder="Nama Barang"
            value={nama_barang}
            onChange={(e) => setNamaBarang(e.target.value)}
            />

            <p>Jumlah Barang</p>
            <input
            className={editStyle.StuffInput}
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
            className={editStyle.StuffInput}
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
            <div className={editStyle.parent}>
            <button className={editStyle.StuffButton} type="submit" disabled={isLoading}>
                {isLoading ? 'Menambahkan...' : 'Edit Barang'}
            </button>
            </div>
        </form>
        </>
    );
}

export default EditStuff;
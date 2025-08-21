import {React,useState} from "react";
import { useEditStuffMutation } from "../../service/stuffservice/stuffapi";
import editStyle from "./stufftedit.module.scss";
import { useParams } from "react-router-dom";

function EditStuff({StuffData}){
    
    const {data: StuffData, isLoading: isFetching} = useGetStuffByIdQuery(id)
    const [nama_barang,setNamaBarang] = useState( () => StuffData?.nama_barang || '');
    const [jumlah_barang,setJumlahBarang] = useState( () => StuffData?.jumlah_barang ||'');
    const [harga,setHargaBarang] = useState(  () => StuffData?.harga || '');
    const [editStuff,{isLoading, isError, isSuccess}] = useEditStuffMutation('')

    const EditStuffHandler = async(e) =>{
        e.preventDefault();

        const updateData = {
            nama_barang,
            jumlah_barang,
            harga,
        };

        try{
            await editStuff({id: StuffData.id, data: updateData});
            alert('Barang berhasil Di Update');
        } catch (err) {
            alert('Gagal update Barang');
        }
    };

    return (
        <>
        <h2 className={editStyle.Stufftitle}>Tambah Barang</h2>
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
                {isLoading ? 'Menambahkan...' : 'Tambah Barang'}
            </button>
            </div>
        </form>
        </>
    );
}

export default EditStuff;
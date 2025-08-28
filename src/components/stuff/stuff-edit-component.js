import {React,useEffect,useState} from "react";
import { useEditStuffMutation, useGetStuffByIdQuery } from "../../service/stuffservice/stuffapi";
import editStyle from "./stufftedit.module.scss";
import {useParams} from "react-router-dom";
import {Button,Result,Modal} from "antd"

function EditStuff(){
    const {id} = useParams();
    const {data: StuffData, isLoading: isFetching} = useGetStuffByIdQuery(id)
    const [nama_barang,setNamaBarang] = useState('');
    const [jumlah_barang,setJumlahBarang] = useState('');
    const [harga,setHargaBarang] = useState('');
    const [editStuff,{isLoading}] = useEditStuffMutation('')
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [isVisibleModalError,setIsVisibleModalError] = useState(false);

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
            await editStuff({id, data: updateData})
            .unwrap();

            setIsVisibleModal(true)
        } catch (err) {
            setIsVisibleModalError(true)
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!nama_barang.trim()){
            newErrors.nama_barang = 'Nama Barang cannot be empy'
        }
    }

    const hadleCloseModal = () => {
        setIsVisibleModal(false)
        window.location.href = '/Stuff'
    }

    const hadleCloseModalError = () => {
        setIsVisibleModal(false)
    }

    const HandleBackButton = () => {
        window.location.href = '/Stuff'
    }

    const handleLink = () => {
        window.location.href = '/Stuff'
    }

    return (
        <>
        <Button 
        className={editStyle.ButtonBack}
        color = "danger"
        variant= "filled"
        onClick = {HandleBackButton}
        >
            Back
        </Button>
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

        <Modal
            className={editStyle.TitleModal}
            title = "Success"
            open = {isVisibleModal}
            onCancel = {hadleCloseModal}
            footer = {[
                <Button className={editStyle.CloseButtonSuccess} key ="close" onClick={handleLink}>
                    Tutup
                </Button>
            ]}
            width={600}
            maskClosable = {false}
            keyboard = {false}
        >
        <Result 
            status= "success"
            title = "SuccessFully Edit Data"
        />
        </Modal>

        <Modal
            className = {editStyle.TitleModal}
            title = "warning"
            open = {isVisibleModalError}
            onCancel = {hadleCloseModalError}
            footer = {[
                <Button className={editStyle.CloseButtonError} key ="close" onClick={handleLink}>
                    Tutup
                </Button>
            ]}
            width={600}
            maskClosable = {false}
            keyboard = {false}
        >
        <Result 
            status= "warning"
            title = "There Something Went Wrong"
        />
        </Modal>
        </>
    );
}

export default EditStuff;
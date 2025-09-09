import { useEffect, useState } from 'react';
import { useDeletStuffMutation, useGetStuffQuery } from '../../service/stuffservice/stuffapi';
import {Button, Table, Modal, Result} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import ListStyle from './stufflist.module.scss'
import { useNavigate } from 'react-router-dom';



function StuffList() {
  const { data, error, isLoading, refetch } = useGetStuffQuery();
  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [selectedRowKeysData,setSelectedRowKeysData] = useState([])
  const [DeleteBulkStuff,{isLoading: isDeletBulk}] = useDeletStuffMutation();
  const [ModalConfirm,setIsModalConfirm] = useState(false);
  const [ModalInvisConfirmError,setIsinvisModalConfirmError] = useState(false);

  const onSelectChange = (newSelectedRowsKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', newSelectedRowsKeys);
    console.log('selectedRowKeys changed: ', selectedRows);
    console.log('selectedRowKeys changed: ', selectedRows.map(row => row.id));
    setSelectedRowKeys(newSelectedRowsKeys);
    setSelectedRowKeysData(selectedRows);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleConfirm = () => {
    console.log("dataLengkap",selectedRowKeysData)
    console.log("data",data)

      if(selectedRowKeys.length !== 0){
        setIsModalConfirm(true)
      } else {
        setIsinvisModalConfirmError(true)
      }
    
  }

  const handleConfirmClose = () => {
      setIsModalConfirm(false)
  }

  const handleConfirmErrorClose = () => {
      setIsinvisModalConfirmError(false)
      
  }

  const handleDeleteBulk = async () => {
    console.log("selectedRowKeys",selectedRowKeys)
    console.log("Payload yang dikirim:", { id: selectedRowKeys });
    try{
      await DeleteBulkStuff({id: selectedRowKeys }).unwrap();
      setSelectedRowKeys([]);
      refetch();
      setIsModalConfirm(false)
    } catch(error){
      console.log("Error Karena kosong")
      setIsModalConfirm(false)
      setIsinvisModalConfirmError(true)
    }
  }

  useEffect(() => {
    refetch();
  },[refetch]);

  const navigate = useNavigate();

  const EditStuffHandler = (data) => {
    console.log('Data Edit')
    navigate(`/EditStuff/${data.id}`);
    console.log("Navigasi Edit")
  }

  const TableBarang = [
    {
      title: 'Nama Barang',
      width: 50,
      dataIndex: 'nama_barang' ,
      key: 'nama_barang',
      fixed: 'left',
    },
    {
      title: 'Jumlah Barang',
      width: 50,
      dataIndex: 'jumlah_barang' ,
      key: 'jumlah_barang',
    },
    {
      title: 'Harga',
      width: 50,
      dataIndex: 'harga' ,
      key: 'harga',
      render: (Value) => `Rp ${Value.toLocaleString()}`,
    },
    {
      title: 'Edit',
      width: 50,
      dataIndex: 'Edit' ,
      fixed:'right',
      key: 'operation',
      render: (_ ,data) => {
        return(      
          <div 
            className={ListStyle.ButtonEdit}
            onClick={() => EditStuffHandler(data)}
            style = {{cursor: 'Pointer'}}
          >
          <EditOutlined />
          </div>
        )
      }
    }
  ]

   const dataSource = data?.Data?.map((item) => ({
    key: item.id,
    ...item,
  })) || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    
    <Button
      color = "primary"
      variant= "solid" 
      onClick={handleConfirm}
      className={ListStyle.BulkDelete}>
      Bulk Delete
    </Button>

    <Table
    columns={TableBarang}
    dataSource={dataSource}
    rowSelection={rowSelection}
    pagination={{ pageSize: 5 }}
    />
  
    <Modal 
      title = "info"
      className= {ListStyle.TitleModal}
      open = {ModalConfirm}
      onCancel = {handleConfirmClose}
      footer = {[
        <Button
          color = "primary"
          variant = "solid" 
          className = {ListStyle.ButtonOk}
          onClick = {handleDeleteBulk}
        > Ok
        </Button>,

        <Button 
          color = "danger"
          variant = "solid"
          onClick = {handleConfirmClose}
          className = {ListStyle.ButtonNo}>Tutup
        </Button>
      ]}
    >
    <Result 
      status= "info"
      title = "Are You Sure You Want To Delete This Data ?"
    />
    </Modal>


    <Modal 
      title = "Warning"
      className= {ListStyle.TitleModal}
      open = {ModalInvisConfirmError}
      onCancel = {handleConfirmErrorClose}
      footer = {[
        <Button
          color = "primary"
          variant = "solid" 
          className = {ListStyle.ButtonOkError}
          onClick = {handleConfirmErrorClose}
        > Ok
        </Button>
      ]}
    >
    <Result 
      status= "warning"
      title = "You Must At Least Choose 1 Item To Delete"
    />
    </Modal>
    </>
    
  );
};

export default StuffList;
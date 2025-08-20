import { useEffect, useState } from 'react';
import { useGetStuffQuery } from '../../service/stuffservice/stuffapi';
import {Table } from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import ListStyle from './stufflist.module.scss'



function StuffList() {
  const { data, error, isLoading, refetch } = useGetStuffQuery();
  const [selectedRowKeys,setSelectedRowKeys] = useState([])

  const onSelectChange = (newSelectedRowsKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', newSelectedRowsKeys);
    console.log('selectedRowKeys changed: ', selectedRows);
    setSelectedRowKeys(newSelectedRowsKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  useEffect(() => {
    refetch();
  },[refetch]);

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
      dataIndex: 'harga' ,
      fixed:'right',
      key: 'operation',
      render: () => {
        return(      
          <div className={ListStyle.ButtonEdit}>
          <EditOutlined style = {{cursor: 'Pointer'}}/>
          </div>
        )
      }
    },
    {
      title: 'Delete',
      width: 50,
      dataIndex: 'harga' ,
      fixed:'right',
      key: 'operation',
      render: () => {
        return(      
          <div className={ListStyle.ButtonDelete}>
          <DeleteOutlined style = {{cursor: 'Pointer'}}/>
          </div>
        )
      }
    },
    

  ]

   const dataSource = data?.Data?.map((item) => ({
    key: item.id,
    ...item,
  })) || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Table
    columns={TableBarang}
    dataSource={dataSource}
    rowSelection={rowSelection}
    />
  );
};

export default StuffList;
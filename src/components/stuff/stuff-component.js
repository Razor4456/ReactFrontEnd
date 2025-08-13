import { useGetStuffQuery } from '../../service/stuffservice/stuffapi';

function StuffList() {
  const { data, error, isLoading } = useGetStuffQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.Data.map((item) => (
        <li key={item.id}>
          <p>Nama Barang: {item.nama_barang}</p>
          <p>Jumlah: {item.jumlah_barang}</p>
          <p>Harga: Rp {item.harga.toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default StuffList;
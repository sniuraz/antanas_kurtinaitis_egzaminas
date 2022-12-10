import styled from 'styled-components';
// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../../../slices/productsSlice';
import EditProduct from '../EditProduct';

export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);

  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.desc,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'imageUrl',
      headerName: 'Paveikslėlis',
      width: 100,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt='' />
          </ImageContainer>
        );
      },
    },
    { field: 'pName', headerName: 'Pavadinimas', width: 130 },
    {
      field: 'pDesk',
      headerName: 'Aprašymas',
      width: 130,
    },
    {
      field: 'price',
      headerName: 'Kaina',
      width: 80,
    },
    {
      field: 'actions',
      headerName: 'Veiksmai',
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Ištrinti</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/product/${params.row.id}`)}>Peržiūrėti</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
    display: flex;
    align-items: center;
    margin: auto;
  }
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

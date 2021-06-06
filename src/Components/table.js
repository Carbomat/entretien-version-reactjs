import React, { useState,useEffect } from "react";
import MaterialTable from "material-table";
import { TextField } from "@material-ui/core";
import axios from 'axios';
import { readString } from 'react-papaparse';
import CsvFile from './ressources/raccordable_par_code_postal.csv'

export default function Editable() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'CP', field: 'cp' },
    { title: 'Nombres raccordés', field: 'nbr' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]);

  const [data, setData] = useState([]);


  // Starting lifecycle and calling for data from database
  useEffect(() => {
    // Parse local CSV file
const results = readString(CsvFile, config)
console.log("firstcsvparse",results)
    /*
    axios.get('https://tomato-love2-backend.herokuapp.com/')
    .then(response => {
      setData(response.data);
    //    this.setState({inventory: response.data});
      setCharg(true);
    })
    .catch(function (error) {
        console.log(error);
    }) */
}, [])

  return (
    <div style={{marginTop:65,marginLeft:'5%'}}>
    <MaterialTable
      style={{width:'95%',
display:'block',
overflowX:'auto'}}
      title="Nombres de raccordés par code postal"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
    </div>
  )
}

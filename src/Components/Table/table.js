import React, { useState,useEffect } from "react";
import MaterialTable from "material-table";
import { TextField } from "@material-ui/core";
import axios from 'axios';
import { readString } from 'react-papaparse';
import { CSVReader } from 'react-papaparse';
import Papa from 'papaparse';
import CsvFile from './ressources/raccordable_par_code_postal.csv'
import Table from 'react-bootstrap/Table'

const buttonRef = React.createRef();

export default function Editable() {

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  
    const [data3, setData3] = useState([]);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [datainsee, setDatainsee] = useState([]);
    const [insee, setInsee] = useState([]);
    const [cp, setCp] = useState("");
    const [load, setLoad] = useState(0);
    const [test, setTest] = useState(0);
    const [sommecommune, setSommecommune] = useState(0);
    const [arr, setArr] = useState([]);
    const [arr2, setArr2] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);

function recherche(e){
    let array = []
setArr( data3.find(element => element[0] == e) )

  setCp(e)
  data3.map(element => {
    if (element[0] == e)
    {
      array.push(element)
    }
  })
  //e.preventDefault();
console.log("res",array)
setTest(array)
setLoad(2)

}

//FONCTION CALCUL DE NOMBRES RACCORDES PAR COMMUNE VIA NUMERO INSEE
function rechercheinsee(e){
  //arr = 
  setInsee(e)
  let tabtest = []
  let somme=0

//ON PARCOURT LE TABLEAU D'OBJET DATAINSEE QUI CONTIENT TOUTES LES INFORMATIONS INSEE RECUPERES VIA L'API
   datainsee.map(element => {
    element.fields.somme=0
   
   //CONDITIONS POUR FILTRER PAR NUMERO INSEE 
    if(element.fields.code_commune_insee == e){
      console.log(element.fields.code_postal)
      //CONDITIONS POUR SUPPRIMER LES DOUBLONS PAR CODE POSTAL
      if(tabtest.find(x => x.code_postal === element.fields.code_postal)==undefined)
      {
        
        data3.map(y => {
            if(element.fields.code_postal == y[0]){
             element.fields.somme = element.fields.somme + parseInt(y[1])
            }
        })
        somme = element.fields.somme + somme
      tabtest.push(element.fields)

    }
    }
  })
setSommecommune(somme)
console.log(tabtest)
setArr(...tabtest)
console.log("mat",arr,"somme:",somme)
setLoad(1)

}
  // Starting lifecycle and calling for data from database
  useEffect(() => {

      axios.get('https://datanova.laposte.fr/api/records/1.0/search//?dataset=laposte_hexasmal&q=974&rows=1000')
      .then(response => {

        console.log("yesman",response.data)
        setDatainsee([...response.data.records]);
        datainsee.map(x=>{
              console.log("yo",x.fields.code_commune_insee,x.fields.code_postal,x.fields.nom_de_la_commune)
    
        })
      //    this.setState({inventory: response.data});
      //setCharg(true);
      })
      .catch(function (error) {
          console.log(error);
      })

    // Parse local CSV file
Papa.parse(CsvFile, {
  download: true,
  complete: function(results) {
    //console.log("ihiope",results);
    let rowData = {}
    let tab = []
    setData3(results.data)}
  })
}, [])


const handleOnFileLoad = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

 const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

 const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

 const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

   const handleSubmit = (evt) => {

     evt.preventDefault();
     setLoad(0)
     setInsee("")
     setCp("")
 }
if(load == 0){
  return (

    <div style={{marginTop:65,marginLeft:'5%'}}>

           <form onSubmit={handleSubmit}>
           <div class="col-auto">
    <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code postal" value={cp} onChange={e=> recherche(e.target.value)}
    />
     <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code insee" value={insee} onChange={e=> rechercheinsee(e.target.value)}
    />
    </div>
         </form>
    <Table responsive
      data-search="true"
    >
  <thead>
    <tr>
        <th >Code Postale </th>
         <th >Nombres raccordés </th>
     
    </tr>
  </thead>
  <tbody>
   
      {data3.map((yo, index) => (
        index>0?
            
        <tr>
        <td > {yo[0]}</td>
        <td > {yo[1]}</td>
        </tr> :     <tr>
        <td > </td>
        <td > </td>
        </tr>
      ))}
    
   
  </tbody>
</Table>

   
    </div>
  )
}else if (load ===1)
{
  return (

    <div style={{marginTop:65,marginLeft:'5%'}}>

             <form onSubmit={handleSubmit}>
           <div class="col-auto">
    <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code postal" value={cp} onChange={e=> recherche(e.target.value)}
    />
     <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code insee" value={insee} onChange={e=> rechercheinsee(e.target.value)}
    />
    </div>
   <button style={{marginTop:10,marginLeft:"275px"}} type="submit" class="btn btn-success mb-3">Fin des recherches</button>
           </form>
    <Table responsive
      data-search="true"
    >
  <thead>
    <tr>
    <th >Nom de la commune </th>
    <th >Code insee </th>
        <th >Code Postale </th>
         <th >Nombres raccordés / commune </th>
     
    </tr>
  </thead>
  <tbody>
   {
     arr != undefined ?

 
    <tr>
        <td > {arr.nom_de_la_commune}</td>
        <td > {insee}</td>
        <td > {arr.code_postal}</td>
        <td > {sommecommune}</td>
        </tr> 
:   <tr>
        <td > </td>
        <td > </td>
        <td ></td>
        <td ></td>
        </tr> 
  }
  </tbody>
</Table>

   
    </div>
  )
} else{
  return (

    <div style={{marginTop:65,marginLeft:'5%'}}>

            <form onSubmit={handleSubmit}>
           <div class="col-auto">
    <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code postal" value={cp} onChange={e=> recherche(e.target.value)}
    />
     <input  style={{marginRight:"60px",marginBottom:"20px"}}
    type="text" class="form-control col-md-4" placeholder="Tapez ici pour une recherche par code insee" value={insee} onChange={e=> rechercheinsee(e.target.value)}
    />
    </div>
   <button style={{marginTop:10,marginLeft:"275px"}} type="submit" class="btn btn-success mb-3">Fin des recherches</button>
           </form>
    <Table responsive
      data-search="true"
    >
  <thead>
    <tr>
        <th >Code Postale </th>
         <th >Nombres raccordés  </th>
     
    </tr>
  </thead>
  <tbody>
   
        {test.map((yo, index) => (
        
            
        <tr>
        <td > {yo[0]}</td>
        <td > {yo[1]}</td>
        </tr>   
      ))}
  </tbody>
</Table>

   
    </div>
  )
}

}

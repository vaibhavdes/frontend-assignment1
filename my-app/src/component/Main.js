import React, { useEffect, useState } from 'react'
import Row from './Row';
//import data from '../data/sample.json';


const Main = () => {
  const [rawData,setRawData] = useState();
  const header = ["Label","Value","Input","Allocation %", "Allocation Val","Variance %"]

  const data = {
    "rows": [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1400,
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000,
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 300
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 700
          }
        ]
      }
    ]
  };

  useEffect(()=>{
    //const json = JSON.parse(data);
    //setRawData(json)
  },[])

  return (
    <div>
        <table border={1} style={{width:"50%"}}>
            <thead id="header">
                <tr id="head">
                    {header.map((title)=><th>{title}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row)=><Row data={row} level={1}  key={row.id}></Row>)}
            </tbody>
        </table>
    </div>
  )
}

export default Main

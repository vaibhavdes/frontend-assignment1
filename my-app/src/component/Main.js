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
        "value": 1500,
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

  const updateParent = (value,id, childId) => {
    const newData = { ...data };
    const parent = newData.rows.find(row => row.id === id);
    if (parent) {
        const oldAmount = parent.value;
        const childrenAmount = parent.children.reduce((sum, child) => sum + child.value, 0);

        parent.value = value;

        parent.children.forEach(child => {
            const percentage = (child.value / childrenAmount) * 100;
            const childAmount = (value * (percentage / 100)).toFixed(2);
            child.value = parseFloat(childAmount);
        });

        const variance = ((value - oldAmount) / oldAmount) * 100;
        parent.variance = variance;
    }
    console.log(parent)
  }

  return (
    <div>
        <table border={1} style={{width:"50%"}}>
            <thead id="header">
                <tr id="head">
                    {header.map((title)=><th>{title}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row)=><Row data={row} level={1}  key={row.id} id={row.id} update={updateParent}></Row>)}
            </tbody>
        </table>
    </div>
  )
}

export default Main

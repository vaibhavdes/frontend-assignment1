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
    setRawData(data)
  },[])


  const updateParent = (changeValue,percentChange, parentId, childId) => {
    const newData =  JSON.parse(JSON.stringify(rawData));
    const parent = newData.rows.find(row => row.id === parentId);

    // WHEN CHILD VARIANCE AND AMOUNT CHANGE
    if(childId && percentChange)
    {
      const child = parent.children.find(row => row.id === childId)
      const amount = child.value;
      const result = amount + (amount * (percentChange / 100));
      const change = result - amount;
      child.value = result;
      child.variance = percentChange;
      parent.variance =  change/parent.value * 100;
      parent.value = parent.value + change;
    }

    if(childId && changeValue)
      {
        const child = parent.children.find(row => row.id === childId)
        const amount = child.value;
        const change = changeValue - amount;
        const result = (change)/amount * 100;
        child.value = changeValue;
        child.variance = result;
        parent.variance =  (changeValue-amount)/parent.value * 100;
        parent.value = parent.value + (changeValue-amount);
      }

    // ONLY IF PARENT VARIANCE CHANGE
    if (childId == null && parent) {
        const oldParent = data.rows.find(row => row.id === parentId);
        const oldAmount = oldParent.value;
        const childrenAmount = parent.children.reduce((sum, child) => sum + child.value, 0);

        parent.value = changeValue;

        parent.children.forEach(child => {
            const childOld = oldParent.children.find(row => row.id === child.id).value;
            const percentage = (child.value / childrenAmount) * 100;
            const childAmount = (changeValue * (percentage / 100)).toFixed(4);
            const variance = (childAmount-childOld)/childOld * 100;
            child.value = parseFloat(childAmount);
            child.variance = variance;
        });

        const variance = (changeValue - oldAmount) / oldAmount * 100;
        parent.variance = variance;
    }
    console.log(newData)
    setRawData(newData)
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
                {rawData && rawData.rows.map((row)=><Row data={row} level={1}  id={row.id} key={row.id} update={updateParent}></Row>)}
            </tbody>
        </table>
    </div>
  )
}

export default Main

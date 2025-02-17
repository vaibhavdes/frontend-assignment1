import React, { useEffect, useRef, useState } from 'react'

const Row = ({data,level,id,update}) => {
  const [amount,setAmount] = useState(0);
  const [variane,setVariane] = useState(0);
  const input = useRef()

  useEffect(()=>{
    setAmount(data.value);
  },[data.value])

  const allocationHandle = ()=>{
    const percent = input.current.value;
    const result = amount + (amount * (percent / 100));
    const change = result - amount;
    setAmount(result);
    setVariane(percent)
    if(level==2){
        update(change);
    }
  }

  const allocationValHandle = ()=>{
    const value = input.current.value;
    const change = value - amount;
    const result = (change)/amount * 100;
    setAmount(value);
    setVariane(result); 
    if(level==2){
        update((value-amount));
    }
    if(level==1){
        //update(value,id)
    }
  }

  const updateVariane = (val,childId) =>{
    const value = amount + val;
    const result = val/amount * 100;
    setVariane(result)
    setAmount((current)=>current + val);
    //update(val,id,childId)
  }

  return (
    <>
    {
    <tr>
        <td>{level==1 ? data.label : "-- " + data.label}</td>
        <td>{amount}</td>
        <td><input ref={input} type="number"/> </td>
        <td><button onClick={allocationHandle}>[button1]</button></td>
        <td><button onClick={allocationValHandle}>[button2]</button></td>
        <td>{parseFloat(variane).toFixed(2)} %</td>
    </tr>
    }
 
    {data.children && data.children.map((row)=><Row data={row} level={2} key={row.id} id={row.id} update={updateVariane}></Row>)}
    </>
  )
}

export default Row

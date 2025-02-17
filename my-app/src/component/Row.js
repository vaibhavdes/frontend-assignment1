import React, { useEffect, useRef, useState } from 'react'

const Row = ({data,level,id,update}) => {
  const [amount,setAmount] = useState(0);
  const [variane,setVariane] = useState(0);
  const input = useRef()

  useEffect(()=>{
    setAmount(data.value);
    setVariane(data.variance)
  },[data.value])

  const allocationHandle = ()=>{
    const percent = parseFloat(input.current.value);
    if(level == 2 )
    update(null,percent,null,id);
  }

  const allocationValHandle = ()=>{
    const value = parseFloat(input.current.value);
    if(level==2){
        //update((value-amount));
        update(value,null,null,id);
    }
    if(level==1){
        update(value,null,id,null)
    }
  }

  const updateVariane = (val,percent,parent,childId) =>{
    update(val,percent,id,childId)
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
        <td>{variane ? parseFloat(variane).toFixed(2) : 0} %</td>
    </tr>
    }
 
    {data.children && data.children.map((row)=><Row data={row} level={2} key={row.id} id={row.id} update={updateVariane}></Row>)}
    </>
  )
}

export default Row

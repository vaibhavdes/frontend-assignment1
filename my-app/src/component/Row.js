import React, { useEffect, useRef, useState } from 'react'

const Row = ({data,level,id}) => {
  const [amount,setAmount] = useState(0);
  const [variane,setVariane] = useState(0);
  const input = useRef()

  useEffect(()=>{
    setAmount(data.value);
  },[])

  return (
    <>
    {
    <tr>
        <td>{level==1 ? data.label : "-- " + data.label}</td>
        <td>{amount}</td>
        <td><input ref={input} type="number"/> </td>
        <td><button onClick="allocationHandle">[button1]</button></td>
        <td><button onClick="allocationValHandle">[button2]</button></td>
        <td>{variane} %</td>
    </tr>
    }
 
    {data.children && data.children.map((row)=><Row data={row} level={2} key={row.id}></Row>)}
    </>
  )
}

export default Row

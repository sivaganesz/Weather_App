// import React, { useState } from 'react'

// export const Usest = () => {
//   const [user,setuser] =useState({name:"",age:"",gender:false,married:false})
//   const handlechack=(e)=>{
//     const name = e.target.name;
//     const value = e.target.type ==="checkbox"?e.target.checked : e.target.value
//     setuser({...user,[name]:value})
//   }
//   return (
//     <>
//     <table border={1}>
//       <tr>
//         <td>Name</td>
//         <td>{user.name}</td>
//       </tr>
//       <tr>
//         <td>Age</td>
//         <td>{user.age}</td>
//       </tr>
//       <tr>
//         <td>Gender</td>
//         <td>{user.gender}</td>
//       </tr>
//       <tr>
//         <td>Married status</td>
//         <td>{user.married ? "married":"not married"}</td>
//       </tr>
//     </table><br /><br />
//     <form>
//       Name  :<input type="text" id='name' name='name' value={user.name} onChange={handlechack}/><br /><br />
//       Age   :<input type="text" id='age' name='age' value={user.age} onChange={handlechack}/><br /><br />
//       Gender:<input type="radio" id='male' name='gender' value="Male" checked={user.gender=="Male"} onChange={handlechack}/>Male
//              <input type="radio" id='female' name='gender' value="Female" checked={user.gender=="Female"}  onChange={handlechack}/>Female<br /><br /><br />
//       isMarried  :<input type="checkbox" id='married' name='married'  onChange={handlechack}/><br /><br /><br />
//     </form>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'

export const Usest = () => {
 const [advice,setadvice]=useState("please click the advice button you get free advice")
 const [count,setcounter]=useState(0)
 async function click(){
  const res = await fetch("")
  const data = await res.json()
  console.log(data);
  setadvice(data.slip.advice)
  setcounter(count + 1)
 }
 useEffect(function(){
  click()
 },[])
  return (
    <>
    {advice} <br /><br />
    <button onClick={click}>advice</button>
    <br /><br />
    {/* <Counters  count={count}/> */}
    {count}
    </>
  )
}

// function Counters(props){
//   return (
//     <p>{props.count}</p>
//   )
// }

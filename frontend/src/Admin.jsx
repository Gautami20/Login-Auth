import React,{useState,useEffect} from 'react'

function Admin() {
    const [data,setData] = useState([])
    // useEffect(() =>{
    //     fetch('http://localhost:8081/users')
    //     .then(res=>res.json)
    //     .then(data=> setData(data))
    //     .catch(err => console.error.log(err));
    // },[])

  return (
    <div style={{padding:'50px'}}>
        <table>
            <thead>
                <th>Item</th>
                <th>Customer1</th>
                <th>Customer2</th>
                <th>Total</th>
            </thead>
            <tbody>
                {data.map((d,i)=>(
                    <tr key={i}>
                        <td>Quantity</td>
                        <td>{d.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Admin
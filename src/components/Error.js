import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
  return (
    <div>
        <h1>Error Occured</h1>
        <button onClick={()=>{
            navigate("/")
        }}>Back To Homepage</button>
    </div>
  )
}

export default Error

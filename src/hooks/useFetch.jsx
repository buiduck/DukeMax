import { useEffect, useState } from "react"
import axios from "axios"
const useFetch = (endpoint) =>{
    const [data,setData] = useState([])
    const [loading,setloading] = useState(false)


    const fetchData = async()=>{
        try {
            setloading(true)
            const response = await axios.get(endpoint)
            setloading(false)
            setData(response.data.data.items)
        } catch (error) {
            console.log('Error',error)
        }
      }

      useEffect(()=>{
        fetchData()
      },[endpoint])
    return {data,loading}
}
export default useFetch
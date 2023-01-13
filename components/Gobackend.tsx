import React from 'react'

export default function Gobackend() {
    const [data, setData] = React.useState("");
    
    const handleGetDataFromGoBackend = async () => {
    const response = await fetch('http://localhost:8080/home', {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Authorization': 'BearereyJhbGciOiJIUzI0NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZ0AxMzkuY29tIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjczODU1NzIwLCJpYXQiOjE2NzM1OTY1MjAsImlzcyI6IkJpa2FzaCJ9.YaGN0JPwXw7-_kfHsYkdevYRRV0D1WwlBRpqZ8sMxKs',
        },})
       const txt=response.json()
        console.log(txt)
        setData(txt)

 }

  return (
    <div>{data}</div>
  )
}

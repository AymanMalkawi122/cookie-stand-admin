import Head from "next/head"
import { useState,useEffect } from "react"
import {hourly_sales} from '@/data'





export default function Home() {

  const [stands, setStands] = useState([])

  function submitHandler(event) {
    event.preventDefault()
    const temp = [...stands]
    temp.push({ location: event.target.location.value, MinimumCustomersPerHour: event.target.minCustomers.value,
      MaximumCustomersPerHour: event.target.maxCustomers.value, AverageCookiesPerSale: event.target.AverageCookies.value, sales: hourly_sales})
    setStands(temp)
  }

  return (
    <>
      <head>
        <title>Cookie Stand Admin</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-col items-center py-4 space-y-8 flex-grow">
          <Form handler={submitHandler} />
          <ReportTable stands={stands} />

        </main>
        <footer className="p-4 mt-8 bg-green-500 text-black-50" >
          &copy; ASAC 2023
        </footer>
      </body >

    </>
  )


}

function Header() {
  return (
    <header className="flex items-center justify-between p-9 bg-green-500 text-black-50">
      <h1 className="text-4xl">Cookie Stand Admin</h1>
    </header>

  )
}

function Form(props) {
  return (
    <form className="flex flex-col w-1/2 p-10 mx-auto my-4 bg-green-200 rounded-xl" onSubmit={props.handler}>
      <h1 className="m-auto">Create cookie Stand</h1>
      <div className="flex my-5">
        <label htmlFor="loation" className="mr-10">location</label>
        <input name='location' className="flex-auto pl-1 bg-white-200" />
      </div>

      <div className="flex">
        <div className="flex flex-col my-5 pl-5">
          <label htmlFor="minCustomers" className="mr-10">Minimum Customers per Hour</label>
          <input name='minCustomers' className="flex-auto pl-1 bg-white-200" />
        </div>

        <div className="flex flex-col my-5 pl-5">
          <label htmlFor="maxCustomers" className="mr-10">Maximum Customers per Hour</label>
          <input name='maxCustomers' className="flex-auto  bg-white-200" />
        </div>

        <div className="flex flex-col my-5 pl-5">
          <label htmlFor="AverageCookies" className="mr-10">Average Cookies per Sale</label>
          <input name='AverageCookies' className="flex-auto pl-1 bg-white-200" />
        </div>
        <button className=" bg-green-500 text-black-50 ml-10 p-9" >Create</button>
      </div>
    </form>
  )
}

function Stand(props){
  
  return(
  <tr>
  <td className="border border-black text-l text-center">{props.location}</td>
  {props.sales.map(sale => { return <td className="border border-black">{sale}</td>
  })}
  <td className="border border-black">{props.sales.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
  </tr>
  )
}

function ReportTable(props) {
  
  if(props.stands.length == 0)
  return (
    <h2>No Cookie Stands Available</h2>
  )

  let stands = []
  let size = 14
  let totals = Array(size)
  for (let index = 0; index < props.stands.length; index++) {
    let current_stand = Stand(props.stands[index])
    stands.push(current_stand)

    for (let j = 0; j < props.stands[index].sales.length; j++) {
      if (isNaN(totals[j])) {
        totals[j] = 0
      }
      totals[j] += props.stands[index].sales[j]
      
    }
  }
  console.log(totals);
  let style = 'border-x-8 border-transparent bg-green-500'
  return(
    <table>
      <tr>
        <th className={style}>location</th>
        <th className={style}>6am</th>
        <th className={style}>7am</th>
        <th className={style}>8am</th>
        <th className={style}>9am</th>
        <th className={style}>10am</th>
        <th className={style}>11am</th>
        <th className={style}>12am</th>
        <th className={style}>1pm</th>
        <th className={style}>2pm</th>
        <th className={style}>3pm</th>
        <th className={style}>4pm</th>
        <th className={style}>5pm</th>
        <th className={style}>6pm</th>
        <th className={style}>7pm</th>
        <th className={style}>Totals</th>
      </tr>
      {stands}
      
      <tr>
        <td className="border border-black">Totals</td>
        {totals.map(total => { return <td className="border border-black">{total}</td>})}
        <td className="border border-black">{totals.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</td>
      </tr>
    </table>
    )
}


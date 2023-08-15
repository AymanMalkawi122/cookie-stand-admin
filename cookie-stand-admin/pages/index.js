import Head from "next/head"
import { useState } from "react"





export default function Home() {

  const [stand, setStand] = useState('no stand added yet ')

  function submitHandler(event) {
    event.preventDefault()
    // console.log(question)
    setStand(JSON.stringify({ location: event.target.location.value, MinimumCustomersPerHour: event.target.minCustomers.value,
      MaximumCustomersPerHour: event.target.maxCustomers.value, AverageCookiesPerSale: event.target.AverageCookies.value }))
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
          <LastStand stand={stand} />

        </main>
        <footer className="p-4 mt-8 bg-gray-500 text-gray-50" >
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
        <label for="loation" className="mr-10">location</label>
        <input name='location' className="flex-auto pl-1 bg-white-200" />
      </div>

      <div className="flex">
        <div className="flex flex-col my-5 pl-5">
          <label for="minCustomers" className="mr-10">Minimum Customers per Hour</label>
          <input name='minCustomers' className="flex-auto pl-1 bg-white-200" />
        </div>

        <div className="flex flex-col my-5 pl-5">
          <label for="maxCustomers" className="mr-10">Maximum Customers per Hour</label>
          <input name='maxCustomers' className="flex-auto  bg-white-200" />
        </div>

        <div className="flex flex-col my-5 pl-5">
          <label for="AverageCookies" className="mr-10">Average Cookies per Sale</label>
          <input name='AverageCookies' className="flex-auto pl-1 bg-white-200" />
        </div>
        <button className=" bg-green-500 text-black-50 ml-10 p-9" >Create</button>
      </div>
    </form>
  )
}

function LastStand(props) {
  return (
        <p className="text-xl text-center">{props.stand}</p>
  )
}


// export default Home;
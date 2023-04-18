import React, { Fragment, useEffect, useState } from 'react'

const ExcessReport = () => {

    const [startDate, setStartDate] = useState("");
    const [edibles, setEdibles] = useState({})
    const [transactions, setTransactions] = useState({})

    let handleSubmit = async () => {
        const formattedStartDate = startDate + " 00:00:00";
        const d = new Date()

        const formattedEndDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:0${d.getMinutes()}:${d.getSeconds()}`
        console.log(formattedStartDate, formattedEndDate)

        const t = await (await fetch(`http://localhost:5000/transactions/${formattedStartDate}/${formattedEndDate}`)).json();
        setTransactions(t)
        console.log(transactions)
    }

    useEffect(() => {

        (async () => {
    
            const toppings = await (await fetch(`http://localhost:5000/toppings`)).json();
            const cheeses = await (await fetch(`http://localhost:5000/cheeses`)).json();
            const drizzles = await (await fetch(`http://localhost:5000/drizzles`)).json();
            const sauces = await (await fetch(`http://localhost:5000/sauces`)).json();
            
            toppings.forEach((e) => setEdibles({...edibles, [e.topping_id]: [e.amount, 0]}) )
            cheeses.forEach((e) => setEdibles({...edibles, [e.cheeseid]: [e.amount, 0] }) )
            drizzles.forEach((e) => setEdibles({...edibles, [e.drizzleid]: [e.amount, 0]}) )
            sauces.forEach((e) => setEdibles({...edibles, [e.sauceid]: [e.amount, 0]}) )
        })()
    }, [])

    return (
        <>
            <label>
                Begin Date:
                <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='mm/dd/yyyy' />
            </label>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Generate Report
            </button>
        </>
    )
}

export default ExcessReport;
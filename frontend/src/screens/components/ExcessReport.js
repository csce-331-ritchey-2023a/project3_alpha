import React, { Fragment, useEffect, useState } from 'react'


/**
 * Displays the Excess Report.
 * @namespace ExcessReport
 * @component
 */
const ExcessReport = () => {

    const [startDate, setStartDate] = useState("04-18-2023 08:00:00");
    const [edibles, setEdibles] = useState({})
    const [transactions, setTransactions] = useState([])
    /**
     * Submits a request to the server for transactions within a specific time range.
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves once the transaction state has been updated.
     */
    let handleSubmit = async () => {
        const formattedStartDate = startDate;
        const d = new Date()

        Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
        }

        const formattedEndDate = `${(d.getMonth()+1).padLeft()}-${d.getDate().padLeft()}-${d.getFullYear().padLeft()} ${d.getHours().padLeft()}:${d.getMinutes().padLeft()}:${d.getSeconds().padLeft()}`

        const t = await (await fetch(`http://localhost:5000/transactions/${formattedStartDate}/${formattedEndDate}`)).json();
        setTransactions(t)

        for (const key of Object.keys(edibles)) {
            // console.log(key)
            const temp = edibles[key]
            temp[1] = t.reduce((acc, cur) => Object.values(cur).includes(key) ? ++acc : acc, 0);
            setEdibles({...edibles, key: temp})
        }

    }

    useEffect(() => {

        (async () => {
            const temp = {}
            const toppings = await (await fetch(`http://localhost:5000/toppings`)).json()
            const cheeses = await (await fetch(`http://localhost:5000/cheeses`)).json();
            const drizzles = await (await fetch(`http://localhost:5000/drizzles`)).json();
            const sauces = await (await fetch(`http://localhost:5000/sauces`)).json();
            
            // toppings.forEach((e) => setEdibles({...edibles, [e.topping_id]: [e.amount, 0]}) )
            // cheeses.forEach((e) => setEdibles({...edibles, [e.cheeseid]: [e.amount, 0] }) )
            // drizzles.forEach((e) => setEdibles({...edibles, [e.drizzleid]: [e.amount, 0]}) )
            // sauces.forEach((e) => setEdibles({...edibles, [e.sauceid]: [e.amount, 0]}) )
            
            toppings.forEach((e) => temp[e.topping_id] = [e.amount, 0] )
            cheeses.forEach((e) => temp[e.cheeseid] = [e.amount, 0] )
            drizzles.forEach((e) => temp[e.drizzleid] = [e.amount, 0] )
            sauces.forEach((e) => temp[e.sauceid] = [e.amount, 0] )

            // console.log(edibles)
            // console.log(temp)
            setEdibles(temp)
        })()
    }, [])

    return (
        <div>
            <div className="text-center">
                <h3 className="text-center">Excess Report</h3>
                <label>
                    Begin Date:
                    <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder='mm-dd-yyyy HH:MM:SS' />
                </label>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Generate Excess Report
                </button>
            </div>
            

            <table className="table table-sm mt-5 text-center">
                <caption className = "table-caption">Toppings</caption>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Past Total</th>
                        <th>Curr Total</th>
                        <th>% Used</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(edibles).map((k) => {
                        const curr_total = edibles[k][0]
                        const past_total = edibles[k][1] + curr_total

                        // console.log(curr_total, past_total, curr_total/past_total)

                        if (curr_total/past_total > 0.9 && curr_total/past_total < 1) {
                            return <tr key={k}>
                                <td>{k}</td>
                                <td>{past_total}</td>
                                <td>{curr_total}</td>
                                <td>{Math.round(1000*edibles[k][1]/(edibles[k][1]+edibles[k][0]))/10}</td>
                            </tr>
                        } else {
                            return ''                        
                        }
                    })} 
                </tbody>
            </table>
        </div>
    )
}

export default ExcessReport;
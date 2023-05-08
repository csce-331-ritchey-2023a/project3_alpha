import React, { useEffect, useState } from 'react'

/**
 * Handles functionality for updating/inserting ingredients.
 * @namespace AddUpdateProducts
 * @component
 */

const AddUpdateProducts = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("")
    const [operation, setOperation] = useState("addnew")

    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
    }, [name, price, amount, type])

    /**
     * Function for handling inserting/updating ingredients.
     * @memberof AddUpdateProducts
     * @function
     */
    let handleSubmit = async () => {
        if (operation == "addnew") {
            await fetch(`https://project3-alpha.onrender.com/update/${type}/${name}/${price}/${amount}`)
        }
        else {
            await fetch(`https://project3-alpha.onrender.com/insert/${type}/${name}/${price}/${amount}`)
        }

        setIsSubmitted(true)
    }

    return (
        <>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={name} onChange={e => setName(e.target.value)}></input>
            <br />

            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="text" value={price} onChange={e => setPrice(e.target.value)}></input>
            <br />

            <label htmlFor="amount" >Amount</label>
            <input id="amount" name="amount" type="text" value={amount} onChange={e => setAmount(e.target.value)}></input>
            <br />

            <label htmlFor="type" value={type}>Type</label>
            <select id="type" value={type} onChange={e => setType(e.target.value)} defaultValue="">
                <option value="" disabled>Pick a topping</option>
                <option value="cheeses">Cheeses</option>
                <option value="toppings">Toppings</option>
                <option value="sauces">Sauces</option>
                <option value="drizzles">Drizzles</option>
            </select>
            <label htmlFor="operation" value={operation}>Operation</label>
            <select id="operation" value={operation} onChange={e => setOperation(e.target.value)} defaultValue="">
                <option value="addnew">Add New</option>
                <option value="update">Update existing</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
            {(isSubmitted) ? <p>Submitted {name} {price} {amount} for the {type} category</p> : ''}
        </>
    )
}

export {
    AddUpdateProducts
}
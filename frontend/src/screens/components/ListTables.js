import React, {Fragment, useEffect, useState} from "react";
import "./ListTables.css";

/**
 * Lists all tables of ingredients within the database.
 * @namespace ListTables
 * @component
 */

const ListTables = () => {

    const [toppings, set_toppings] = useState([]);
    const [cheeses, set_cheeses] = useState([]);
    const [sauces, set_sauces] = useState([]);
    const [drizzles, set_drizzles] = useState([]);

    /**
     * A function that handles receiving the list of toppings from the database.
     * @memberof ListTables
     * @async
     * @function
     * @returns {Promise<void>} Resolved with no value when the list of toppings has been set in the state
     * 
     */
    const get_toppings = async () => {
        try{

            const response = await fetch("http://localhost:5000/toppings");
            const json_data = await response.json();

            //console.log(json_data)
            set_toppings(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    };

    /**
     * A function that handles receiving the list of cheeses from the database.
     * @memberof ListTables
     * @async
     * @function
     * @returns {Promise<void>} Resolved with no value when the list of cheeses has been set in the state
     * 
     */
    const get_cheeses = async () => {
        try{

            const response = await fetch("http://localhost:5000/cheeses");
            const json_data = await response.json();

            //console.log(json_data)
            set_cheeses(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    }
    /**
     * A function that handles receiving the list of sauces from the database.
     * @memberof ListTables
     * @async
     * @function
     * @returns {Promise<void>} Resolved with no value when the list of sauces has been set in the state
     * 
     */
    const get_sauces = async () => {
        try{

            const response = await fetch("http://localhost:5000/sauces");
            const json_data = await response.json();

            //console.log(json_data)
            set_sauces(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    }
    /**
     * A function that handles receiving the list of drizzles from the database.
     * @memberof ListTables
     * @async
     * @function
     * @returns {Promise<void>} Resolved with no value when the list of drizzles has been set in the state
     * 
     */
    const get_drizzles = async () => {
        try{

            const response = await fetch("http://localhost:5000/drizzles");
            const json_data = await response.json();

            //console.log(json_data)
            set_drizzles(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    }


    useEffect(() => {
        get_toppings();
        get_cheeses();
        get_sauces();
        get_drizzles();
    },[]);

    return <Fragment>
        <div className = "row">
            <div className = "col-md-6 mb-4">
                <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Toppings</caption>
                    <thead>
                        <tr>
                            <th>Topping</th>
                            <th>Customer Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toppings.map(topping => (
                            <tr key={topping.topping_id}>
                                <td>{topping.topping_id}</td>
                                <td>{Math.round(topping.customer_price*100)/100}</td>
                                <td>{topping.amount}</td>

                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>

            <div className = "col-md-6 mb-4">
                <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Cheeses</caption>
                    <thead>
                        <tr>
                            <th>Cheese</th>
                            <th>Customer Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cheeses.map(cheese => (
                            <tr key={cheese.cheeseid}>
                                <td>{cheese.cheeseid}</td>
                                <td>{Math.round(cheese.customerprice*100)/100}</td>
                                <td>{cheese.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className = "col-md-6 mb-4">
                <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Sauces</caption>
                    <thead>
                        <tr>
                            <th>Sauce</th>
                            <th>Customer Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sauces.map(sauce => (
                            <tr key={sauce.sauceid}>
                                <td>{sauce.sauceid}</td>
                                <td>{Math.round(sauce.customerprice*100)/100}</td>
                                <td>{sauce.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className = "col-md-6 mb-4">
                <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Drizzles</caption>
                    <thead>
                        <tr>
                            <th>Drizzle</th>
                            <th>Customer Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drizzles.map(drizzle => (
                            <tr key={drizzle.drizzleid}>
                                <td>{drizzle.drizzleid}</td>
                                <td>{Math.round(drizzle.customerprice*100)/100}</td>
                                <td>{drizzle.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

        </div>
    </Fragment>;

}

export default ListTables;
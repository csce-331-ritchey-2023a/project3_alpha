import React, {Fragment, useEffect, useState} from "react";
import "./ListTables.css";

const ListTables = () => {

    const [toppings, set_toppings] = useState([]);
    const [cheeses, set_cheeses] = useState([]);
    const [sauces, set_sauces] = useState([]);
    const [drizzles, set_drizzles] = useState([]);

    const get_toppings = async () => {
        try{

            const response = await fetch("https://project3-alpha.onrender.com/toppings");
            const json_data = await response.json();

            //console.log(json_data)
            set_toppings(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    };

    const get_cheeses = async () => {
        try{

            const response = await fetch("https://project3-alpha.onrender.com/cheeses");
            const json_data = await response.json();

            //console.log(json_data)
            set_cheeses(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    }

    const get_sauces = async () => {
        try{

            const response = await fetch("https://project3-alpha.onrender.com/sauces");
            const json_data = await response.json();

            //console.log(json_data)
            set_sauces(json_data);
        }
        catch(err){
            console.error(err.message)
        }
    }

    const get_drizzles = async () => {
        try{

            const response = await fetch("https://project3-alpha.onrender.com/drizzles");
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
            <div className = "col-md-6">
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

            <div className = "col-md-6">
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

            <div className = "col-md-6">
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

            <div className = "col-md-6">
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
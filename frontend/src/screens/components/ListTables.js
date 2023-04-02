import React, {Fragment, useEffect, useState} from "react";
import "./ListTables.css";

const ListTables = () => {

    const [toppings, set_toppings] = useState([]);
    const [cheeses, set_cheeses] = useState([]);
    const [sauces, set_sauces] = useState([]);
    const [drizzles, set_drizzles] = useState([]);

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

    console.log(toppings);

    return <Fragment>
        <div className = "row">

            <div className = "col-md-6">
                <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Toppings</caption>
                    <thead>
                        <tr>
                            <th>topping_id</th>
                            <th>amount</th>
                            <th>customer_price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toppings.map(topping => (
                            <tr key={topping.topping_id}>
                                <td>{topping.topping_id}</td>
                                <td>{topping.amount}</td>
                                <td>{topping.customer_price}</td>
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
                            <th>cheeseid</th>
                            <th>customerprice</th>
                            <th>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cheeses.map(cheese => (
                            <tr key={cheese.cheeseid}>
                                <td>{cheese.cheeseid}</td>
                                <td>{cheese.customerprice}</td>
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
                            <th>sauceid</th>
                            <th>customerprice</th>
                            <th>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sauces.map(sauce => (
                            <tr key={sauce.sauceid}>
                                <td>{sauce.sauceid}</td>
                                <td>{sauce.customerprice}</td>
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
                            <th>drizzleid</th>
                            <th>customerprice</th>
                            <th>amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drizzles.map(drizzle => (
                            <tr key={drizzle.drizzleid}>
                                <td>{drizzle.drizzleid}</td>
                                <td>{drizzle.customerprice}</td>
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
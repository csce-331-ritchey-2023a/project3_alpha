import React, {Fragment, useEffect, useState} from "react";
import './XZReport.css'
import Axios from 'axios';

export const XZReport = () => {
    const [zreport, setZreport] = useState([]);

    const getXZreport = () => {
        Axios.get('http://localhost:5000/a/b/c/d/zreport')
            .then((response) => {
                setZreport(response.data)
                // console.log("helloooooowdfwpdcoc")
                // console.log(zreport)
            })
            .catch(() => {
                console.log('error')
            })
    }

    const generateZreport = async () =>{
        Axios.get('http://localhost:5000/a/b/c/d/zreport/insert')
            .then((response) => {
                getXZreport();
            })
            .catch(() => {
                console.log('error')
            })
    }

    const handleSubmit = () => {
        // if (zreport.length == 0){
        //     generateZreport();
        // } else if(formatDate(zreport[zreport.length-1].reportdate) == formatDate(Date.now())) {
        //     alert("Can not generate a Z report from same day");
        // } else {
            generateZreport();
        }
        
    // }


    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }

    useEffect(() => {
        getXZreport();
    },[]);

  return (
    <Fragment>
        <div className="container">
            XZReport
        </div>
        <table className="table table-sm mt-5 text-center">
                    <caption className = "table-caption">Zreport Table</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Totals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zreport.map(zreport => (
                            <tr key={zreport.reportid}>
                                <td>{zreport.reportid}</td>
                                <td>{formatDate(zreport.reportdate)}</td>
                                <td>{zreport.totals}</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Generate Zreport
                </button>
    </Fragment>
    
  )
}

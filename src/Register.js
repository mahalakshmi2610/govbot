import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register=(props)=>{
    let history = useNavigate();
    const [data, setData]=useState({
        email:"",
        password:""
    }) 

    const handleChange=(e)=>{
        setData({ ...data, [e.target.name]: e.target.value });
        //console.log(data)
    }

    const submitForm=(e)=>{ 
        e.preventDefault();
        const sendData={
            email:data.email,
            password:data.password
        }
        

        axios.post('http://localhost/govbotreactphp/insert.php',sendData)
        .then((result)=>{
            if(result.data.Status === 'Invalid') {
                alert('Invalid User');
            }
            else {
                history('/login');
            }
        })
    }

    return(
        <div className="main-box">
            <form onSubmit={submitForm}>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Register</h1>
                </div>
                <div className="row">
                    <div className="col-md-6">Email</div>
                    <div className="col-md-6">
                        <input type="text" name="email" className="form-control"
                        onChange={handleChange} value={data.email}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">Password</div>
                    <div className="col-md-6">
                        <input type="password" name="password" className="form-control"
                        onChange={handleChange} value={data.password}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <input type="submit" name="submit" value="Register" className="btn btn-success"/>
                    </div>
                </div>
            </div>
            </form>
        </div>
        
    )
}
export default Register;
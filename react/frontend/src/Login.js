import React, {useState} from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: username,
            password: password
        };

        axios.post('http://localhost:5000/login', data, {
            withCredentials: true
        })
            .then((response) => {
                setauthenticated(true)
                localStorage.setItem("authenticated", true);
                navigate('/dashboard')
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="background-radial-gradient overflow-hidden">
                <div
                    className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0"
                             style={{'zIndex': '10'}}>
                            <h1 className="my-5 display-5 fw-bold ls-tight"
                                style={{'color': 'hsl(218, 81%, 95%)'}}>
                                Health <br/>
                                <span
                                    style={{'color': 'hsl(218, 81%, 75%)'}}>Tracker</span>
                            </h1>
                            <p className="mb-4 opacity-70"
                               style={{'color': 'hsl(218, 81%, 85%)'}}>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni
                                tempora mollitia
                                dolorum consequatur nulla, neque debitis eos
                                reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div
                            className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1"
                                 className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2"
                                 className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    {/* <form> */}
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="text" id="form3Example3"
                                               className="form-control"
                                               value={username}
                                               onChange={handleUsernameChange}/>
                                        <label htmlFor='username'
                                               className="form-label"
                                               for="form3Example3">Username</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="password"
                                               id="form3Example4"
                                               className="form-control"
                                               value={password}
                                               onChange={handlePasswordChange}/>
                                        <label htmlFor='password'
                                               className="form-label"
                                               for="form3Example4">Password</label>
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button type="submit"
                                            className="btn btn-primary btn-block mb-4">
                                        Login
                                    </button>
                                    <br></br>
                                    <a href='./register'>New user? Register here</a>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>

    );
};

export default Login;

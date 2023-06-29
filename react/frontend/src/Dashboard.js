import {useEffect, useState} from 'react';
import './Dashboard.css';
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
        setauthenticated(loggedInUser);
        }
    }, []);

    // if (!authenticated) {
    // // Redirect
    //     return <Navigate replace to='/login' />
    // } else {
        return (
        <form className='form-class'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Jane Smith</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="#">98 <sub>BPM</sub></a>
                    </div>
                    </div>
                    <a>12:00:00</a>
                    <span class="badge text-bg-secondary">Profile</span>
                </div>
            </nav>
            <div style={{'margin':'50px'}}></div>
            <div class="row row-cols-1 row-cols-sm-4 g-2">
                <div class="col">
                    <div class="card">
                        {/* graphs will go here instead of image */}
                        <img src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png" style={{'width': '350px',
  'height': '300px'}} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Activity</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png" style={{'width': '350px',
  'height': '300px'}} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Nutritions</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png" style={{'width': '355px',
  'height': '300px'}} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Sleep Chart</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png" style={{'width': '350px',
  'height': '300px'}} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Weight</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>


        );
};

export default Dashboard;
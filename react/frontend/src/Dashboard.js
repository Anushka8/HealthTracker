import {useEffect, useState} from 'react';
import './Dashboard.css';
import axios from "axios";
import HeartRateGraph from './HeartRateGraph';

const Dashboard = () => {
    const [authenticated, setauthenticated] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (item, index) => {
        setSelectedItem(item);
        setSelectedRowIndex(index);
        setIsOpen(!isOpen);
    };

    const handleCross = (item, index) => {
        setSelectedItem(null);
        setSelectedRowIndex(null);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
            fetchData();
        }
        return () => clearInterval(timer);
    }, []);

    const fetchData = () => {
        // Make an API call to the Flask backend
        axios.get('http://localhost:5000/data', {
            withCredentials: true
        })
            .then((response) => {
                console.log('2');
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>; // Render a loading indicator while data is being fetched
    }
    // if (!authenticated) {
    // // Redirect
    //     return <Navigate replace to='/login' />
    // } else {
    return (
        <form className='form-class'>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">{data.user.name}</a>
                    <button class="navbar-toggler" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse"
                         id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page"
                               href="#">98 <sub>BPM</sub></a>
                        </div>
                    </div>
                    <a>{currentTime.toLocaleTimeString()}</a>
                    <span class="badge text-bg-secondary">Profile</span>
                </div>
            </nav>
            <div style={{'margin': '50px'}}></div>
            <div class="row row-cols-1 row-cols-sm-4 g-2">
                <div class="col">
                    <div class="card">
                        {/* graphs will go here instead of image */}
                        <div className="item-list-container">
                            {data.activity.length > 0 ? (
                                <table className="item-table">
                                    <thead>
                                    <tr>
                                        <th>Activity Type</th>
                                        <th>Duration</th>
                                        <th>Calories Burned</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.activity.map((item, index) => (
                                        <tr
                                            key={item.activity_id}
                                            className={selectedRowIndex === index ? 'active' : ''}
                                            onClick={() => handleClick(item, index)}
                                        >
                                            <td>{item.activity_type}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.calories_burned}</td>
                                        </tr>

                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No items found.</p>
                            )}
                            {selectedItem && (
                                <div className="popup-box">
                                    <span className="popup-close" onClick={() => handleCross()}>
        &times;
      </span>
                                    {/* Content of the pop-up box */}
                                    <p>Activity: {selectedItem.activity_type}</p>
                                    <p>Duration: {selectedItem.duration} mins</p>
                                    <p>Calories
                                        Burned: {selectedItem.calories_burned} kcal</p>
                                    <p>Start Time: {selectedItem.start_time}</p>
                                    <p>End Time: {selectedItem.end_time}</p>
                                    <p>Distance: {selectedItem.distance} miles</p>
                                </div>
                            )}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Activity</h5>
                            <p class="card-text">This is a longer
                                card with
                                supporting text below as a natural
                                lead-in to
                                additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div style={{width: '350px', height: '300px'}}
                             class="card-img-top" alt="...">
                            {data && <HeartRateGraph data={data}/>}
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Heart Rate</h5>
                            <p class="card-text">This is a longer card with
                                supporting text below as a natural lead-in to
                                additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img
                            src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png"
                            style={{
                                'width': '355px',
                                'height': '300px'
                            }} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Sleep Chart</h5>
                            <p class="card-text">This is a longer card with
                                supporting text below as a natural lead-in to
                                additional content.</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img
                            src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png"
                            style={{
                                'width': '350px',
                                'height': '300px'
                            }} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Weight</h5>
                            <p class="card-text">This is a longer card with
                                supporting text below as a natural lead-in to
                                additional content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>


    );
};

export default Dashboard;
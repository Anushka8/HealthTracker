import { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import HeartRateGraph from "./HeartRateGraph";
import BMIIndicator from "./BMIIndicator";
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
    }, 1000);

    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      fetchData();
    }
    return () => clearInterval(timer);
  }, []);

  function calculateBMI(weight, height) {
    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI using the formula
    const bmi = weight / (heightInMeters * heightInMeters);

    // Return the calculated BMI
    return bmi.toFixed(2); // Round the BMI to 2 decimal places
  }

  const fetchData = () => {
    // Make an API call to the Flask backend
    axios
      .get("http://localhost:5000/data", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("2");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }
  return (
    <form className="form-className container-fluid">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="https://www.svgrepo.com/show/429867/activity-tracker-fitness.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          HealthTracker
        </a>
        <form class="d-flex">
          {/* <a>{currentTime.toLocaleTimeString()}</a> */}
          <a className="navbar-brand" href="#">
            {data.user.name}
          </a>
          <div class="dropdown">
            <a href=".\login">
              <img
                src="https://toppng.com/uploads/preview/logout-11551049168o9cg0mxxib.png"
                width="35"
                height="35"
                role="button"
                title="Logout"
              />
            </a>
          </div>
        </form>
      </nav>
      <div style={{ margin: "50px" }}></div>
      <div
        className="row row-cols-1 row-cols-sm-4 g-2"
        style={{ marginBottom: "8rem" }}
      >
        <div className="col">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            {/* graphs will go here instead of image */}
            <div className="item-list-container table-container">
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
                        className={selectedRowIndex === index ? "active" : ""}
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
                  <p>Calories Burned: {selectedItem.calories_burned} kcal</p>
                  <p>Start Time: {selectedItem.start_time}</p>
                  <p>End Time: {selectedItem.end_time}</p>
                  <p>Distance: {selectedItem.distance} miles</p>
                </div>
              )}
            </div>
            <div className="card-body">
              <h5 className="card-title">Activity</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div
              style={{
                height: "300px",
              }}
              className="card-img-top"
              alt="..."
            >
              {data && <HeartRateGraph data={data} />}
            </div>
            <div className="card-body">
              <h5 className="card-title">Heart Rate</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <img
              src="https://cdn.statcdn.com/Statistic/1310000/1314613-blank-754.png"
              style={{
                width: "355px",
                height: "300px",
              }}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Sleep Chart</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div
              style={{
                width: "350px",
                height: "300px",
              }}
              className="card-img-top"
            >
              <div className="content" style={{ "font-size": "2rem" }}>
                {data.weight[0].weight} kgs
              </div>
              <div className="weight_date">
                Last measured on: {data.weight[0].timestamp}
              </div>

              <div className="bmi">
                BMI: {calculateBMI(data.weight[0].weight, data.user.height)}
                <BMIIndicator
                  bmi={calculateBMI(data.weight[0].weight, data.user.height)}
                />
              </div>
            </div>

            <div className="card-body">
              <h5 className="card-title">Weight</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted text-center bg-light">
        CSCI621 DBSI Group 3
      </div>
    </form>
  );
};

export default Dashboard;

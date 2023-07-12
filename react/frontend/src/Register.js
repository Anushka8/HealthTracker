import {useEffect, useState} from 'react';
import './Register.css';
import axios from "axios";

const Register = () =>{
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
      password: ''
    });

    const handleInputChange = (event) => {
      setFormData({
        // create a shallow copy
        ...formData,
        [event.target.name]: event.target.value
      });
    };

    const handleRegister = (event) => {
      event.preventDefault()
      //add registration logic here
      console.log(formData)
      // Reset the form
      setFormData({
        name: '',
        username: '',
        email: '',
        password: ''
      });
    };
    return (
      <form onSubmit={handleRegister}>
        <section className="vh-100" style={{"backgroundColor": "#eee"}}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{"borderRadius": "25px"}}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <div className="mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-1">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example1c" className="form-control" name="name" value={formData.name} onChange={handleInputChange}/>
                              <label className="form-label" htmlFor="form3Example1c">Name</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-1">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example2c" className="form-control" name="username" value={formData.username} onChange={handleInputChange}/>
                              <label className="form-label" htmlFor="form3Example2c">Username</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-1">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="form3Example3c" className="form-control" name="email" value={formData.email} onChange={handleInputChange}/>
                              <label className="form-label" htmlFor="form3Example3c">Email</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-1">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4c" className="form-control" name="password" value={formData.password} onChange={handleInputChange}/>
                              <label className="form-label" htmlFor="form3Example4c">Password</label>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-1">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4cd" className="form-control" />
                              <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                            </div>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
                          </div>

                        </div>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://img.freepik.com/free-vector/flat-design-apps-fitness-tracker_23-2148527079.jpg" className="img-fluid" alt="Sample image"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    );
};

export default Register;
import {useEffect, useState} from "react";
import "./Register.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const genderOptions = [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'},
        {value: 'other', label: 'Other'},
    ];
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        dob: "",
        weight: "",
        height: "",
        gender: "",
    });

    const handleInputChange = (event) => {
        setFormData({
            // create a shallow copy
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const onAmountChange = (event) => {
        const amount = event.target.value;
        const decimalRegex = /^\d+(\.(\d{1,2})?)?$/;
        if (decimalRegex.test(amount)) {
            setFormData({
                // create a shallow copy
                ...formData,
                [event.target.name]: event.target.value,
            });
        } else {
            setFormData({
                weight: ""
            });
        }
    };

    const handleRegister = (event) => {
        event.preventDefault()
        console.log(formData);
        if (formData.password === formData.repeatPassword) {
            axios
                .post("http://localhost:5000/register", formData, {
                    withCredentials: true,
                })
                .then((response) => {
                    navigate("/login");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setPasswordError('Passwords do not match');
        }

        setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            dob: "",
            weight: "",
            height: "",
            gender: ""
        });
    };
    return (
        <form onSubmit={handleRegister}>
            <section className="vh-100" style={{backgroundColor: "#eee"}}>
                <div className="container h-100">
                    <div
                        className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black"
                                 style={{borderRadius: "25px"}}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div
                                            className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>

                                            <div className="mx-1 mx-md-4">
                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example1c"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="form-control"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                        />

                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example2c"
                                                    >
                                                        Username
                                                    </label>
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            className="form-control"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Email
                                                    </label>
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="form-control"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Date of Birth
                                                    </label>
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-column mb-0">
                                                        <input
                                                            type="date"
                                                            id="dob"
                                                            className="form-control"
                                                            name="dob"
                                                            value={formData.dob}
                                                            onChange={handleInputChange}
                                                        />

                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Gender
                                                    </label>
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-column mb-0">
                                                        <select
                                                            id="gender"
                                                            className="form-control"
                                                            name="gender"
                                                            value={formData.gender}
                                                            onChange={handleInputChange}>
                                                            <option
                                                                value="">Select
                                                                Gender
                                                            </option>
                                                            <option
                                                                value="Male">Male
                                                            </option>
                                                            <option
                                                                value="Female">Female
                                                            </option>
                                                            <option
                                                                value="Other">Other
                                                            </option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Weight (kgs)
                                                    </label>
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-column mb-0">
                                                        <input
                                                            type="texts"
                                                            id="weight"
                                                            className="form-control"
                                                            name="weight"
                                                            value={formData.weight}
                                                            onChange={onAmountChange}
                                                        />

                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example3c"
                                                    >
                                                        Height (cms)
                                                    </label>
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-column mb-0">
                                                        <input
                                                            type="number"
                                                            id="height"
                                                            className="form-control"
                                                            name="height"
                                                            value={formData.height}
                                                            onChange={handleInputChange}
                                                        />

                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example4c"
                                                    >
                                                        Password
                                                    </label>
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                        />

                                                    </div>
                                                </div>

                                                <div
                                                    className="d-flex flex-row align-items-center mb-1">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="form3Example4cd"
                                                    >
                                                        Repeat your password
                                                    </label>
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div
                                                        className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="repeatPassword"
                                                            className="form-control"
                                                            name="repeatPassword"
                                                            value={formData.repeatPassword}
                                                            onChange={handleInputChange}
                                                        />

                                                    </div>
                                                </div>
                                                {passwordError &&
                                                    <p>{passwordError}</p>}
                                                <div
                                                    className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        value=""
                                                        id="form2Example3c"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="form2Example3c"
                                                    >
                                                        I agree all statements
                                                        in{" "}
                                                        <a href="#!">Terms of
                                                            service</a>
                                                    </label>
                                                </div>

                                                <div
                                                    className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://img.freepik.com/free-vector/flat-design-apps-fitness-tracker_23-2148527079.jpg"
                                                className="img-fluid"
                                                alt="Sample image"
                                            />
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

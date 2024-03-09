import { useState } from 'react';
// import Outernavbar from './outernavbar.component';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        CIN: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const { CIN, nom, prenom, email, password, password_confirmation } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (CIN.length < 2 || CIN.length > 20) {
            alert("CIN should be between 2-20 characters");
            return;
        }
        if (nom.length < 2 || nom.length > 20) {
            alert("Nom should be between 2-20 characters");
            return;
        }
        if (prenom.length < 2 || prenom.length > 20) {
            alert("Prénom should be between 2-20 characters");
            return;
        }
        if (password.length < 6) {
            alert("Password should be greater than 5 characters");
            return;
        }
        if (password !== password_confirmation) {
            alert("Enter the same password in both fields");
            return;
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/auth/register', formData);
            if (res.data.message === "User successfully registered") {
                alert("Registration Successful");
                window.location = "/";
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.email && err.response.data.email[0] === "The email has already been taken.") {
                alert("The email has already been taken.");
            }
        }

        setFormData({
            CIN: '',
            nom: '',
            prenom: '',
            email: '',
            password: '',
            password_confirmation: ''
        });
    };

    return (
        <div className='App'>
            {/* <Outernavbar /> */}
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={onSubmit}>
                        <h3>Sign Up</h3>
                        <div>
                            <div className="mb-3">
                                <label>CIN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="CIN"
                                    onChange={onChange}
                                    name="CIN"
                                    value={CIN}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nom"
                                    onChange={onChange}
                                    name="nom"
                                    value={nom}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Prénom"
                                    onChange={onChange}
                                    name="prenom"
                                    value={prenom}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={onChange}
                                    name="email"
                                    value={email}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={onChange}
                                    name="password"
                                    value={password}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={onChange}
                                    name="password_confirmation"
                                    value={password_confirmation}
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                            <p className="forgot-password text-right">
                                Already registered <a href="/sign-in">sign in?</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

// import { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         CIN: '',
//         nom: '',
//         prenom: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const { CIN, nom, prenom, email, password, password_confirmation } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();

//         if (CIN.length < 2 || CIN.length > 20) {
//             alert("CIN should be between 2-20 characters");
//             return;
//         }
//         if (nom.length < 2 || nom.length > 20) {
//             alert("Nom should be between 2-20 characters");
//             return;
//         }
//         if (prenom.length < 2 || prenom.length > 20) {
//             alert("Prénom should be between 2-20 characters");
//             return;
//         }
//         if (password.length < 6) {
//             alert("Password should be greater than 5 characters");
//             return;
//         }
//         if (password !== password_confirmation) {
//             alert("Enter the same password in both fields");
//             return;
//         }

//         try {
//             const res = await axios.post('http://127.0.0.1:8000/api/auth/register', formData);
//             if (res.data.message === "User successfully registered") {
//                 alert("Registration Successful");
//                 window.location = "/";
//             }
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.email && err.response.data.email[0] === "The email has already been taken.") {
//                 alert("The email has already been taken.");
//             }
//         }

//         setFormData({
//             CIN: '',
//             nom: '',
//             prenom: '',
//             email: '',
//             password: '',
//             password_confirmation: ''
//         });
//     };

//     return (
//         <div className='App'>
//             <div className="auth-wrapper">
//                 <div className="auth-inner">
//                     <form onSubmit={onSubmit}>
//                         <h3>Sign Up</h3>
//                         <div>
//                             <div className="mb-3">
//                                 <label>CIN</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="CIN"
//                                     onChange={onChange}
//                                     name="CIN"
//                                     value={CIN}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label>Nom</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Nom"
//                                     onChange={onChange}
//                                     name="nom"
//                                     value={nom}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label>Prénom</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Prénom"
//                                     onChange={onChange}
//                                     name="prenom"
//                                     value={prenom}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label>Email address</label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     placeholder="Enter email"
//                                     onChange={onChange}
//                                     name="email"
//                                     value={email}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label>Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     placeholder="Enter password"
//                                     onChange={onChange}
//                                     name="password"
//                                     value={password}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label>Confirm Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     placeholder="Enter password"
//                                     onChange={onChange}
//                                     name="password_confirmation"
//                                     value={password_confirmation}
//                                 />
//                             </div>
//                             <div className="d-grid">
//                                 <button type="submit" className="btn btn-primary">
//                                     Sign Up
//                                 </button>
//                             </div>
//                             <p className="forgot-password text-right">
//                                 Already registered <a href="/sign-in">sign in?</a>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;



// import { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//     const [formData, setFormData] = useState({
//         CIN: '',
//         nom: '',
//         prenom: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const { CIN, nom, prenom, email, password, password_confirmation } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async e => {
//         e.preventDefault();

//         if (CIN.length < 2 || CIN.length > 20) {
//             alert("CIN should be between 2-20 characters");
//             return;
//         }
//         if (nom.length < 2 || nom.length > 20) {
//             alert("Nom should be between 2-20 characters");
//             return;
//         }
//         if (prenom.length < 2 || prenom.length > 20) {
//             alert("Prénom should be between 2-20 characters");
//             return;
//         }
//         if (password.length < 6) {
//             alert("Password should be greater than 5 characters");
//             return;
//         }
//         if (password !== password_confirmation) {
//             alert("Enter the same password in both fields");
//             return;
//         }

//         try {
//             const res = await axios.post('http://127.0.0.1:8000/api/auth/register', formData);
//             if (res.data.message === "User successfully registered") {
//                 alert("Registration Successful");
//                 window.location = "/";
//             }
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.email && err.response.data.email[0] === "The email has already been taken.") {
//                 alert("The email has already been taken.");
//             }
//         }

//         setFormData({
//             CIN: '',
//             nom: '',
//             prenom: '',
//             email: '',
//             password: '',
//             password_confirmation: ''
//         });
//     };

//     return (
//         <div className='App'>
//                         <nav className="bg-[#00246B] p-4 z-10">
//                 <div className="flex items-center justify-start">
//                     <img src='./logo.png' alt="Logo" className="h-14" /> {/* Remplacez la source par votre logo */}
//                     <div className='text-white ml-2 font-bold text-lg'>
//                         <h1>ISTA HAY SALAM</h1>
//                     </div>
//                 </div>
//             </nav>
//             <div className="flex justify-center items-center h-screen bg-gray-100">
//                 <div className="bg-white p-6 rounded shadow-md w-[80%] mt-2">
//                     <h3 className="text-2xl font-semibold mb-4">Creer un compte</h3>
//                     <form onSubmit={onSubmit}>
//                     <div className='flex justify-evenly align-middle'>
//                         <div className='m-2'>
//                             <div className="mb-4 w-[350px]">
//                                                 <label className="block text-gray-700 text-sm font-bold mb-2">CIN</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-input w-full border rounded-md px-4 py-2"
//                                                     placeholder="CIN"
//                                                     onChange={onChange}
//                                                     name="CIN"
//                                                     value={CIN}
//                                                 />
//                                             </div>
//                             <div className="mb-4 w-[350px]">
//                                                 <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-input w-full border rounded-md px-4 py-2"
//                                                     placeholder="Nom"
//                                                     onChange={onChange}
//                                                     name="nom"
//                                                     value={nom}
//                                                 />
//                                             </div>
//                             <div className="mb-4 w-[350px]">
//                                                 <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-input w-full border rounded-md px-4 py-2"
//                                                     placeholder="Prénom"
//                                                     onChange={onChange}
//                                                     name="prenom"
//                                                     value={prenom}
//                                                 />
//                                             </div>
//                         </div>
//                         <div className='m-2'>
//                             <div className="mb-4 w-[350px]">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
//                                 <input
//                                     type="email"
//                                     className="form-input w-full border rounded-md px-4 py-2"
//                                     placeholder="Enter email"
//                                     onChange={onChange}
//                                     name="email"
//                                     value={email}
//                                 />
//                             </div>
//                             <div className="mb-4 w-[350px]">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-input w-full border rounded-md px-4 py-2"
//                                     placeholder="Enter password"
//                                     onChange={onChange}
//                                     name="password"
//                                     value={password}
//                                 />
//                             </div>
//                             <div className="mb-6 w-[350px]">
//                                 <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
//                                 <input
//                                     type="password"
//                                     className="form-input w-full border rounded-md px-4 py-2"
//                                     placeholder="Enter password"
//                                     onChange={onChange}
//                                     name="password_confirmation"
//                                     value={password_confirmation}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                         <div className="flex items-center justify-between">
//                             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
//                             <p className="text-right text-sm">
//                                 Already registered <a href="/sign-in" className="text-blue-500 hover:text-blue-600">sign in?</a>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;






import { useState } from 'react';
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

        axios.post('http://127.0.0.1:8000/api/auth/register', formData)
        .then((res) => {
            if (res.status === 201) {
                alert("Registration Successful");
                window.location = "/";
            }
        }).catch((error) => {
            console.log(error);
        });

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
                <nav className="bg-[#00246B] p-4 z-10">
                    <div className="flex items-center justify-start">
                        <img src='./logo.png' alt="Logo" className="h-14" /> {/* Remplacez la source par votre logo */}
                        <div className='text-white ml-2 font-bold text-lg'>
                            <h1>ISTA HAY SALAM</h1>
                        </div>
                    </div>
                </nav>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                    <h3 className="text-2xl font-semibold mb-4 text-center">Créer un compte</h3>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">CIN</label>
                            <input
                                type="text"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Entrer votre CIN"
                                onChange={onChange}
                                name="CIN"
                                value={CIN}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                            <input
                                type="text"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Entrer votre Nom"
                                onChange={onChange}
                                name="nom"
                                value={nom}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                            <input
                                type="text"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Entrer votre Prénom"
                                onChange={onChange}
                                name="prenom"
                                value={prenom}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Adresse mail</label>
                            <input
                                type="email"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Entrer votre email"
                                onChange={onChange}
                                name="email"
                                value={email}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
                            <input
                                type="password"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Entrer votre mot de passe"
                                onChange={onChange}
                                name="password"
                                value={password}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirmer mot de passe</label>
                            <input
                                type="password"
                                className="form-input w-full border rounded-md px-4 py-2 text-sm"
                                placeholder="Confirmer votre mot de passe"
                                onChange={onChange}
                                name="password_confirmation"
                                value={password_confirmation}
                            />
                        </div>
                        <div className="w-full text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">Sign Up</button>
                            <p className=" items-center mt-2 text-base">
                            Vous avez déjà un compte? <a href="/" className="text-green-500 hover:text-green-600">Se connecter</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


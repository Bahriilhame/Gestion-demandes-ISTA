import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user') !== null);
    const [role,setRole]=useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null)

    const handleSubmit = async (e) => {
            e.preventDefault();

            const userObject = {
                email: email,
                password: password
            };

            axios.post('http://127.0.0.1:8000/api/auth/login', userObject)
                .then((res) => {
                    if (res.status === 200) {
                        setLoggedIn(true);
                        localStorage.setItem('user', JSON.stringify(res.data));
                        setRole(res.data.user.role);
                        console.log(res.data.user);
                        if (role === 'directeur') {
                            navigate('/dashboard-directeur/listDemandes');
                            window.location.reload()
                        } else if (role === 'gestionnaire') {
                            navigate('/dashboard-gestionnaire/listDemandes');
                            // window.location.reload()
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    setError('Email ou mot de passe incorrect')
                });


            setEmail('');
            setPassword('');
    };

        if (loggedIn) {
            if (role === 'directeur') {
                navigate('/dashboard-directeur/listDemandes');
                window.location.reload()
            } else if (role === 'gestionnaire') {
                navigate('/dashboard-gestionnaire/listDemandes');
                // window.location.reload()
            }
        }

    return (
        <div className='overflow-hidden bg-gray-100'>
            <nav className="bg-[#00246B] p-4 z-10">
                <div className="flex items-center justify-start">
                    <img src='./logo.png' alt="Logo" className="h-14" /> {/* Remplacez la source par votre logo */}
                    <div className='text-white ml-2 font-bold text-lg'>
                        <h1>ISTA HAY SALAM</h1>
                    </div>
                </div>
            </nav>
            <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Connexion</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <span className='text-red-500 text-sm'>{error}</span>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;





// import  { useState } from 'react';
// import axios from 'axios';
// import { Navigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loggedIn, setLoggedIn] = useState(localStorage.getItem('user') !== null);

//     const onChangeUserEmail = (e) => {
//         setEmail(e.target.value);
//     }

//     const onChangePassword = (e) => {
//         setPassword(e.target.value);
//     }

//     const onSubmit = (e) => {
//         e.preventDefault();

//         const userObject = {
//             email: email,
//             password: password
//         };

//         axios.post('http://127.0.0.1:8000/api/auth/login', userObject)
//             .then((res) => {
//                 if (res.status === 200) {
//                     setLoggedIn(true);
//                     localStorage.setItem('user', JSON.stringify(res.data));
//                 }
//             }).catch((error) => {
//                 console.log(error);
//                 alert("Wrong email or password");
//             });

//         setEmail('');
//         setPassword('');
//     }

//     if (loggedIn) {
//         return <Navigate to="/dashboard" />;
//     }

//     return (
//         <div className='App'>
//             <div className="auth-wrapper">
//                 <div className="auth-inner">
//                     <form onSubmit={onSubmit}>
//                         <h3>Sign In</h3>
//                         <div className="mb-3">
//                             <label>Email address</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 placeholder="Enter email"
//                                 onChange={onChangeUserEmail}
//                                 name="email"
//                                 value={email}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 placeholder="Enter password"
//                                 onChange={onChangePassword}
//                                 name="password"
//                                 value={password}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <div className="custom-control custom-checkbox">
//                                 <input
//                                     type="checkbox"
//                                     className="custom-control-input"
//                                     id="customCheck1"
//                                 />
//                                 <label className="custom-control-label" htmlFor="customCheck1">
//                                     Remember me
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="d-grid">
//                             <button type="submit" className="btn btn-primary">
//                                 Login
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useState } from 'react';
import axios from 'axios';
import NavIsta from '../NavIsta';
import Footer from '../Footer';

const SignUp = () => {
    const [error,setError]=useState(null)
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
            setError("CIN doit être entre 2-20 caractères");
            return;
        }
        if (nom.length < 2 || nom.length > 20) {
            setError("Nom doit être entre 2-20 caractères");
            return;
        }
        if (prenom.length < 2 || prenom.length > 20) {
            setError("Prénom doit être entre 2-20 caractères");
            return;
        }
        if (password.length < 6) {
            setError("mot de passe doit être plus de 5 caractères");
            return;
        }
        if (password !== password_confirmation) {
            setError("Entrer le meme mot de passe");
            return;
        }

        axios.post('http://127.0.0.1:8000/api/auth/register', formData)
        .then((res) => {
            if (res.status === 201) {
                alert("Compte créé avec succès");
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
            <NavIsta/>
            <div className="flex justify-center items-center bg-gray-100 mt-4">
                <div className="bg-white p-8 rounded shadow-md w-full mb-16 sm:w-[40rem] ">
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
                        <div className="mb-2">
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
                        <span className='text-red-500 text-sm mb-2'>{error}</span>
                        <div className="w-full text-center mt-2">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">S&apos;authentifier</button>
                            <p className=" items-center mt-2 text-base">
                            Vous avez déjà un compte? <a href="/" className="text-green-500 hover:text-green-600">Se connecter</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SignUp;


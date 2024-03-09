import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import DashboardDirect from './DashboardDirect';
import {useEffect,useState} from 'react'
import DashboardGest from './DashboardGest';
import './index.css';
import ListStagiaires from './Components/ListStagiaires';
import FormStagiaire from './Components/FormStagiaire';
import AddGestionnaire from './Components/AddGestionnaire';
import ListeGestionnaires from './Components/ListeGestionnaires';
import Login from './Components/Login';
import SignUp from './Components/signup';
// import NotFound from './NotFound';
 
export default function RouteFunc() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user.role : null;
        setRole(userRole);
    }, [localStorage]);

    useEffect(() => {
        if (window.location.pathname === '/') {
            localStorage.removeItem("user");
        }
    }, [window.location.pathname]);

    return (
        <BrowserRouter>
            <div className="flex h-screen bg-gray-100">
                <div className="flex-grow">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        {role === 'directeur' ?
                            <Route path='/dashboard-directeur' element={<DashboardDirect />}>
                                <Route path="listDemandes" element={<ListStagiaires />} />
                                <Route path="AddStagiaire" element={<FormStagiaire />} />
                                <Route path="listGestionnaire" element={<ListeGestionnaires />} />
                                <Route path="AddGestionnaire" element={<AddGestionnaire />} />
                            </Route>
                            :
                            <Route path='/dashboard-gestionnaire' element={<DashboardGest />}>
                                <Route path="listDemandes" element={<ListStagiaires />} />
                                <Route path="AddStagiaire" element={<FormStagiaire />} />
                            </Route>
                        }
                        <Route path="/sign-up" element={<SignUp />} />

                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}






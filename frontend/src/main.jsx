import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import DashboardDirect from './DashboardDirect';
// import DashboardGest from './DashboardGest';
import './index.css';
import RouteFunc from './Route';
// import ListStagiaires from './Components/ListStagiaires';
// import FormStagiaire from './Components/FormStagiaire';
// import AddGestionnaire from './Components/AddGestionnaire';
// import ListeGestionnaires from './Components/ListeGestionnaires';
// import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard-directeur' element={<DashboardDirect/>}>
              <Route path="listDemandes" element={<ListStagiaires />} />
              <Route path="AddStagiaire" element={<FormStagiaire />} />
              <Route path="listGestionnaire" element={<ListeGestionnaires />} />
              <Route path="AddGestionnaire" element={<AddGestionnaire />} />
            </Route>
            <Route path='/dashboard-gestionnaire' element={<DashboardGest />}>
              <Route path="listDemandes" element={<ListStagiaires />} />
              <Route path="AddStagiaire" element={<FormStagiaire />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter> */}
    <RouteFunc/>
  </React.StrictMode>,
);


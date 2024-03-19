import { useEffect } from 'react';
import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast(){
    useEffect(()=>{
        toast.success('Ajouter avec succès', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    },[])

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
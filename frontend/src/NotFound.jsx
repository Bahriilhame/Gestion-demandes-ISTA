import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <div className='overflow-hidden bg-gray-100'>
            <nav className="bg-[#00246B] p-4 z-10">
                <Link to='/' className="flex items-center justify-start cursor-pointer">
                    <img src='/logo.png' alt="Logo" className="h-14" />
                    <div className='text-white ml-2 font-bold text-lg'>
                        <h1>ISTA HAY SALAM</h1>
                    </div>
                </Link>
            </nav>
            <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Lien erroné</h2>
            </div>

        </div>
        </div>
    );
};

export default NotFound;

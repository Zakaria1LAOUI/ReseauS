import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

export default function NavigationBar() {
    const location = useLocation();
    const { id } = useParams();

    return (
        <div className="flex h-screen ">
            {/* Barre latérale */}
            <div className="bg-gray-100 text-black w-1/6">
                <nav className="p-8 mt-8">
                    <NavLink 
                        to={`/${id}/navigation/home`}
                        className={location.pathname === `/${id}/navigation/home` ? "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded font-bold text-teal-500 block" : "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded block"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </NavLink >
                    
                    <NavLink 
                        to={`/${id}/navigation/explore`}
                        className={location.pathname === `/${id}/navigation/explore` ? "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded font-bold text-teal-500 block" : "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded block"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>
                    </NavLink >
                    
                    <NavLink 
                        to={`/${id}/navigation/courses`}
                        className={location.pathname === `/${id}/navigation/courses` ? "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded font-bold text-teal-500 block" : "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded block"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path  strokeLinecap="round" strokeLinejoin="round"  d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                        </svg>
                    </NavLink >

                    <NavLink 
                        to={`/${id}/navigation/competitions`}
                        className={location.pathname === `/${id}/navigation/competitions` ? "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded font-bold text-teal-500 block" : "flex gap-1 hover:bg-gray-300 px-4 py-4 rounded block"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path  strokeLinecap="round" strokeLinejoin="round"  d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                        </svg>
                    </NavLink >
                </nav>
            </div>

            {/* Contenu */}
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>
    )
}

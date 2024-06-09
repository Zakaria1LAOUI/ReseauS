import { useState, useContext } from 'react'
import axios from 'axios'
import {Navigate} from "react-router-dom"
import { UserContext } from '../userContext'

export default function SettingsPage(){
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)
 
    async function logout(ev) {
        ev.preventDefault();
        await axios.post('/logout')
        setUser(null)
        setRedirect(true)
    }

    if (redirect) 
    return <Navigate to='/' />
    
    return (
        <div className='flex-grow items-center mt-16'>
            <h1 className="font-bold text-center mb-3">Disconnect from here</h1>
            <div className="flex justify-center"> 
                <button onClick={logout} className="bg-pink-500 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </div>
       
    )
}
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from  'axios';

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  async function registerUser(ev){
    ev.preventDefault()
    try{
      await axios.post('/register', {
        name,
        email,
        password,
      })
      alert ('Registration Succeful')
    } catch (e) {
      alert ('Registration Failed')
    }
  }
  return (
    <div className="bg-gray-100 text-black min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-teal-500">Create a new Account</h2>
        </div>
        <form className="mt-8 space-y-2" onSubmit={registerUser}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <input
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={ev => setName(ev.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                type='email'
                value={email}
                onChange={ev => setEmail(ev.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={ev => setPasword(ev.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Créer un nouveau compte
            </button>
            <Link to={'/login'}>
                Click here to connet to your Account !
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState(null);

  async function handleloginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      alert('Login Successful');
      setUserId(response.data._id);
      setRedirect(true);
    } catch (e) {
      alert('Error');
    }
  }

  if (redirect && userId) {
    window.location.reload();
    window.location.href = `${userId}/navigation/home`;
  }

  return (
    <div className="bg-gray-100 text-black min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-teal-500">Connect to your Account</h2>
        </div>
        <form className="mt-8 space-y-2" onSubmit={handleloginSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:ring-2 focus:ring-offset-2 "
            >
              Se connecter
            </button>
            <Link to={'/register'}>
              Create a new Account ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

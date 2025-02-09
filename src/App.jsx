import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle state
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=5&seed=abc');
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Fix: Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-neutral-300 text-black'} w-screen min-h-screen relative transition-colors duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-2 right-2 w-20 h-10 bg-neutral-900 text-white rounded-md shadow-md hover:translate-y-0.5 cursor-pointer transition duration-200"
      >
        {darkMode ? 'Light 🌞' : 'Dark 🌙'}
      </button>

      {/* Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-neutral-800 border-opacity-50"></div>
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        // User Cards
        <div className="w-screen p-6 flex flex-wrap justify-center items-start gap-4">
          {users.map((user, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-black'}
               md:w-[460px] w-[90vw] aspect-video rounded-xl overflow-hidden flex gap-4 shadow-2xl p-5 duration-200 hover:translate-y-1.5`}
            >
              <img
                src={user.picture.large}
                alt={user.name.first}
                className="h-full w-[45%] aspect-square object-cover rounded-l-xl rounded-r-sm"
              />
              <div className="cont flex flex-col gap-4">
                <h2 className="md:text-2xl text-lg font-bold uppercase">{user.name.first} {user.name.last}</h2>
                <p className="md:text-xl text-sm capitalize text-neutral-600">{user.gender}</p>
                <p className="md:text-xl text-sm text-neutral-600">{user.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

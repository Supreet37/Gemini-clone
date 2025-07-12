import React, { useRef, useState, useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { Context } from "../../context/Context";

const LoginModal = ({ setShowLogin, setUsername, setImage, setLoggedIn }) => {
  const [localImage, setLocalImage] = useState(null);
  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);

  const { darkMode } = useContext(Context);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setLocalImage(imageURL);
      setImage(imageURL);
      setLoggedIn(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(localUsername);
    setShowLogin(false);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div
        className={`rounded-xl p-8 shadow-lg w-[90%] max-w-md text-center transition 
          max-md:w-[75%] max-md:p-4 
          ${darkMode ? "bg-[#1e1e1e] text-gray-100" : "bg-white text-gray-800"}`}
      >
        <h2 className="text-2xl font-semibold mb-6 max-md:text-lg max-md:mb-4">
          Login
        </h2>

        <div className="relative w-24 h-24 mx-auto mb-5 max-md:w-20 max-md:h-20">
          <img
            src={localImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
          <button
            className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white"
            onClick={() => fileInputRef.current.click()}
          >
            <FaCamera className="text-base max-md:text-sm" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-md:space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
            className={`w-full px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-400 
              max-md:py-1 max-md:text-sm
              ${darkMode
                ? "bg-[#2a2a2a] border border-gray-600 text-white"
                : "border border-gray-300"}`}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-400 
              max-md:py-1 max-md:text-sm
              ${darkMode
                ? "bg-[#2a2a2a] border border-gray-600 text-white"
                : "border border-gray-300"}`}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-red-400 text-white py-2 rounded hover:opacity-90 transition max-md:py-1 max-md:text-sm cursor-pointer"
          >
            Login
          </button>
        </form>

        <button
          className={`mt-4 text-sm hover:underline cursor-pointer 
            ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          onClick={() => setShowLogin(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

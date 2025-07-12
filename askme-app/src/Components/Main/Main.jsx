import React, { useContext, useState, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import {
  FaUserCircle,
  FaCompass,
  FaLightbulb,
  FaCommentDots,
  FaCode,
  FaImage,
  FaMicrophone,
  FaPaperPlane,
} from "react-icons/fa";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    darkMode,
  } = useContext(Context);

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("Dev");
  const [image, setImage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [setInput]);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setListening(!listening);
  };

  return (
    <div
      className={`flex-1 min-h-screen pb-[15vh] max-sm:pb-[300px] relative ${
        darkMode ? "bg-[#111827] text-white" : "bg-white text-[#333]"
      }`}
    >
      <div
        className={`flex items-center justify-between text-[22px] px-5 py-4 max-md:ml-15 ${
          darkMode ? "text-gray-100" : "text-gray-600"
        }`}
      >
        <p className="text-xl font-semibold max-md:text-sm">Askme</p>
        <div className="flex items-center gap-2">
          {!loggedIn && (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-500 to-red-400 text-white px-4 py-1 cursor-pointer rounded-full shadow hover:opacity-90 transition max-md:text-sm "
            >
              Login
            </button>
          )}
          {image ? (
            <img
              src={image}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 rounded-full text-gray-500" />
          )}
        </div>
        {showLogin && (
          <LoginModal
            setShowLogin={setShowLogin}
            setUsername={setUsername}
            setImage={setImage}
            setLoggedIn={setLoggedIn}
          />
        )}
      </div>

      <div className="max-w-[900px] mx-auto max-lg:max-w-[600px] max-xl:max-w-[800px] max-md:max-w-[600px]">
        {showResult ? (
          <div className="px-5 max-h-[70vh] overflow-y-auto relative">
            <div className="w-full flex justify-end mb-6 ">
              <div className="my-10 flex items-end flex-col  gap-5 ">
                {image ? (
                  <img
                    src={image}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 rounded-full" />
                )}
                <div className=" max-sm:max-w-[200px] max-md:max-w-[500px]  break-words  text-sm">
                  {recentPrompt}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 max-md:ml-10">
              <img src={assets.gemini_icon} alt="" className="h-10 w-10" />
              {loading ? (
                <div className="flex flex-col gap-3 w-full">
                  <hr className="rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 h-5 animate-pulse border-0" />
                  <hr className="rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 h-5 animate-pulse border-0" />
                  <hr className="rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 h-5 animate-pulse border-0" />
                </div>
              ) : (
                <p
                  className="text-[17px] font-light leading-relaxed max-md:text-[15px]"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div
              className={`my-20 text-6xl font-medium px-5 mb-25 max-md:mb-30 max-lg:text-4xl max-xl:text-5xl max-lg:mb-30 max-xl:mb-70 max-2xl:mb-80 max-md:ml-15 ${
                darkMode ? "text-gray-300 " : "text-[#c4c7c5] "
              }`}
            >
              <p>
                <span className="bg-gradient-to-r from-blue-500 to-red-400 bg-clip-text text-transparent max-md:text-md">
                  Hello, {username}.
                </span>
              </p>
              <p className="max-md:text-[30px] max-sm:text-[20px]">
                How can I help you today?
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-lg:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]  gap-4 px-5 max-md:hidden">
              <div
                className={`h-[200px] p-4 rounded-lg relative cursor-pointer border transition-all duration-300 max-lg:h-[150px] ${
                  darkMode
                    ? "bg-[#111827] border-gray-700 hover:bg-[#383838]"
                    : "bg-[#f1f5f9] border-gray-200 hover:bg-[#dbe0e0]"
                }`}
              >
                <p
                  className={`text-xl max-lg:text-xs ${
                    darkMode ? "text-gray-100" : "text-[#333]"
                  }`}
                >
                  Suggest beautiful places to see on an upcoming road trip
                </p>
                <div
                  className={`absolute bottom-3 right-3 w-8 h-8 p-1 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  <FaCompass />
                </div>
              </div>

              <div
                className={`h-[200px] p-4 rounded-lg relative cursor-pointer border transition-all duration-300 max-lg:h-[150px] ${
                  darkMode
                    ? "bg-[#111827] border-gray-700 hover:bg-[#383838]"
                    : "bg-[#f1f5f9] border-gray-200 hover:bg-[#dbe0e0]"
                }`}
              >
                <p
                  className={`text-xl max-lg:text-xs ${
                    darkMode ? "text-gray-100" : "text-[#333]"
                  }`}
                >
                  Briefly summarize this concept: urban planning
                </p>
                <div
                  className={`absolute bottom-3 right-3 w-8 h-8 p-1 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  <FaLightbulb />
                </div>
              </div>

              <div
                className={`h-[200px] p-4 rounded-lg relative cursor-pointer border transition-all duration-300 max-lg:h-[150px] ${
                  darkMode
                    ? "bg-[#111827] border-gray-700 hover:bg-[#383838]"
                    : "bg-[#f1f5f9] border-gray-200 hover:bg-[#dbe0e0]"
                }`}
              >
                <p
                  className={`text-xl max-lg:text-xs ${
                    darkMode ? "text-gray-100" : "text-[#333]"
                  }`}
                >
                  Brainstorm team bonding activities for our work retreat
                </p>
                <div
                  className={`absolute bottom-3 right-3 w-8 h-8 p-1 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  <FaCommentDots />
                </div>
              </div>

              <div
                className={`h-[200px] p-4 rounded-lg relative cursor-pointer border transition-all duration-300 max-lg:h-[150px] ${
                  darkMode
                    ? "bg-[#111827] border-gray-700 hover:bg-[#383838]"
                    : "bg-[#f1f5f9] border-gray-200 hover:bg-[#dbe0e0]"
                }`}
              >
                <p
                  className={`text-xl max-lg:text-xs ${
                    darkMode ? "text-gray-100" : "text-[#333]"
                  }`}
                >
                  Improve the readability of the following code
                </p>
                <div
                  className={`absolute bottom-3 right-3 w-8 h-8 p-1 ${
                    darkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  <FaCode />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-5 w-full max-w-[900px] max-lg:max-w-[600px] max-xl:max-w-[800px] px-5 max-md:max-w-[500px] max-sm:max-w-[80%] max-md:ml-15">
          <div
            className={`flex items-center justify-between gap-4 px-5 py-3 rounded-full transition max-md:gap-0 max-md:relative ${
              darkMode
                ? "bg-[#2a2a2a] text-white"
                : "bg-[#f0f4f9] text-black xl:py-5"
            }`}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent outline-none text-[18px] max-md:text-[12px]"
            />
            <div className="flex items-center gap-3 max-md:gap-2">
              <FaMicrophone
                size={24}
                className={`cursor-pointer max-md:size-3 ${
                  listening ? "text-red-500 animate-pulse" : ""
                }`}
                onClick={handleMicClick}
              />
              {input && (
                <FaPaperPlane
                  size={24}
                  className="cursor-pointer max-md:size-3"
                  onClick={() => onSent()}
                />
              )}
            </div>
          </div>
          <p className="text-[13px] text-center font-light mt-4">
            Gemini may display inaccurate info{" "}
            <span className="max-lg:hidden">
              , including about people, so double-check its responses. Your
              privacy and Gemini Apps
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;

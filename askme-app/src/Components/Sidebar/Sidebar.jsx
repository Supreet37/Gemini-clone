import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./Sidebar.css";
import { BsPlusLg } from "react-icons/bs";
import { RiSettings5Line, RiHistoryFill, RiQuestionLine } from "react-icons/ri";
import { PiChatCircleTextLight } from "react-icons/pi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { BsSun, BsMoonStars } from "react-icons/bs";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    darkMode,
    toggleTheme,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  return (
    <div
      className={`sidebar max-md:fixed max-md:z-50 h-screen py-6 px-4 flex flex-col items-center relative transition-all duration-500 ease-in-out max-md:px-2 max-md:overflow-y-auto  
      ${darkMode ? "bg-[#1f2937] text-white" : "bg-[#f0f4f9] text-black"}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div
            onClick={() => setExtended((prev) => !prev)}
            className={`p-3 rounded-full cursor-pointer transition ${
              darkMode ? "hover:bg-[#333]" : "hover:bg-[#e2e6eb]"
            }`}
          >
            <HiOutlineBars3 size={20} />
          </div>

          {extended && (
            <div
              className={`p-2 rounded-full cursor-pointer transition ${
                darkMode ? "hover:bg-[#333]" : "hover:bg-[#e2e6eb]"
              }`}
            >
              <IoSearchOutline size={20} />
            </div>
          )}
        </div>

        <div
          onClick={() => newChat()}
          className={`mt-12 w-full p-3 text-sm cursor-pointer rounded-full transition-all duration-300 max-md:p-1.5 ${
            darkMode
              ? "bg-[#2c2c2c] text-gray-200 hover:bg-[#3a3a3a]"
              : "bg-[#e6eaf1] text-gray-500 hover:bg-[#dfe4ea]"
          } ${extended ? "flex items-center gap-2" : "flex justify-center"}`}
        >
          <BsPlusLg size={30} />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="flex flex-col mt-8 animate-fadeIn">
            <p className="mb-5 text-sm font-medium">Recent</p>
            <div className="max-h-[320px] overflow-y-auto pr-1 sidebar-scroll ">
              {prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className={`flex items-start gap-3 py-2 px-3 pr-10 rounded-full text-sm cursor-pointer transition ${
                    darkMode
                      ? "text-gray-200 hover:bg-[#333]"
                      : "text-[#282828] hover:bg-[#e2e6eb]"
                  }`}
                >
                  <PiChatCircleTextLight size={20} />
                  <p>{item.slice(0, 8)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className= {`fixed bottom-4 px-3 ${extended ? "left-0" : ""}`}>
  <div
    className={`flex flex-col  gap-2 mt-0 ${extended ? "" : "items-center"} max-md:items-start`}
  >
    {showOptions && (
      <div className="flex flex-col gap-2">
        <div
          className={`inline-flex items-center text-sm cursor-pointer transition rounded-full  ${
            darkMode
              ? "text-gray-200 hover:bg-[#333]"
              : "text-[#282828] hover:bg-[#e2e6eb]"
          } ${extended ? "gap-3 px-4 py-2" : "p-2 justify-center"}`}
        >
          <RiQuestionLine size={20} />
          {extended && <p>Help</p>}
        </div>

        <div
          className={`inline-flex items-center text-sm cursor-pointer transition rounded-full ${
            darkMode
              ? "text-gray-200 hover:bg-[#333]"
              : "text-[#282828] hover:bg-[#e2e6eb]"
          } ${extended ? "gap-3 px-4 py-2 " : "p-2 justify-center"}`}
        >
          <RiHistoryFill size={20} />
          {extended && <p>Activity</p>}
        </div>

        <div
          onClick={toggleTheme}
          className={`inline-flex items-center text-sm cursor-pointer transition rounded-full ${
            darkMode
              ? "text-gray-200 hover:bg-[#333]"
              : "text-[#282828] hover:bg-[#e2e6eb]"
          } ${extended ? "gap-3 px-4 py-2" : "p-2 justify-center"}`}
        >
          {darkMode ? <BsSun size={20} /> : <BsMoonStars size={20} />}
          {extended && <p>{darkMode ? "Light" : "Dark"}</p>}
        </div>
      </div>
    )}

    <div
      onClick={() => setShowOptions((prev) => !prev)}
      className={`inline-flex items-center text-sm cursor-pointer transition rounded-full  ${
        darkMode
          ? "text-gray-200 hover:bg-[#333]"
          : "text-[#282828] hover:bg-[#e2e6eb]"
      } ${extended ? "gap-3 px-4 py-2 " : "p-2 justify-center"}`}
    >
      <RiSettings5Line size={20} />
      {extended && <p>Settings</p>}
    </div>
  </div>
</div>


    </div>
  );
};

export default Sidebar;

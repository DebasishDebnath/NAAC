import React from "react";
import Lottie2 from "react-lottie";
import ErrorLottie from "../Lottie/errorLottie.json";
import { useEffect } from "react";

export const ErrorPopup = ({ takeData, setPopupShow }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPopupShow(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div
      className=" fixed font-poppins top-0 left-0 h-[100vh] w-[100vw] z-[400] flex justify-center items-center bg-[#1414145e] backdrop-blur-md alertcontainer1"
      onClick={(e) => {
        if (e.target.classList.contains("alertcontainer1")) {
          setPopupShow(false);
        }
      }}
    >
      <div className="alertcontent1 bg-[#ffffff]  rounded-md flex flex-col justify-center items-center px-[12%] py-10 gap-1">
        <header className="text-[2rem] font-[700]">
          <Lottie2 options={defaultOptions} height={100} width={100} />
        </header>
        <main>
          <p className="text-[30px] font-[700]  max-h-[200px] overflow-y-auto break-words">
            {takeData}
          </p>
        </main>
        <footer
          className="text-[20px] mt-10 font-[700] bg-[#0077cc] text-white px-4 py-2 rounded-md select-none cursor-pointer"
          onClick={() => {
            setPopupShow(false);
          }}
        >
          Okay
        </footer>
      </div>
    </div>
  );
};

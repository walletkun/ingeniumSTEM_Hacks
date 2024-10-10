"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { CornerRightDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Component() {
  {
    /*Main Page */
  }

  // "Take the Tour" scroll animation
  const scrollToExplore = (event) => {
    const targetElement = document.getElementById("target-section"); 
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset; 
      const startPosition = window.pageYOffset; 
      const distance = targetPosition - startPosition; 
      const duration = 2000; 
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime; 
        const elapsed = currentTime - startTime; 
        const progress = Math.min(elapsed / duration, 1); 
        const ease = easeInOutCubic(progress); 

        window.scrollTo(0, startPosition + distance * ease); 

        if (progress < 1) {
          requestAnimationFrame(animation); 
        }
      };

      requestAnimationFrame(animation); 
    }
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; 
  };

  return (
    <div className="flex flex-col min-h-[100dvh] text-[#f0f0f0] font-mono">
      {/*Hero Section */}
      <div
        style={{
          backgroundImage: "url('/images/PastedGraphic-1-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex-1 flex flex-col min-h-[100dvh]"
      >
        {/*Navbar */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-black bg-opacity-0">
          <Link href="/" className="text-2xl font-semibold text-black" prefetch={false}>
            CICERO
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="auth/login/email"
              className="rounded-full bg-[#000000] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Login
            </Link>
            <Link
              href="auth/register"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium hover:bg-[#e0e0e0] text-black transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Sign Up
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center space-y-4 mt-8">
            <h1 className="text-5xl font-medium mt-28 text-black text-wrap">
              <TypeAnimation
                sequence={["Revolutionize the way you learn.", 1000]}
                wrapper="span"
                speed={60}
                style={{ fontSize: "1.3em", display: "inline-block" }}
              />
            </h1>

            <div className="mt-32 font-sans font-light">
              <p className="text-black mt-5 mb-3 text-xl">
                Meet <strong>CICERO</strong>. Your own AI-powered tutor. Upload
                materials, generate flashcards, <br /> and perfect your
                studies—all in one place.
              </p>
            </div>

            <div className="flex space-x-2 justify-center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="auth/register"
                  className=" mr-3 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#121212] hover:bg-white shadow-lg transition-colors duration-300 ease-in-out"
                  prefetch={false}
                >
                  Try CICERO
                  <ArrowRightUpIcon className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-md font-medium text-[#ffffff] hover:bg-[#1a1a1a] shadow-lg ml-2 transition-colors duration-300 ease-in-out"
                  prefetch={false}
                >
                  Learn About the Devs
                  <RightArrowCircleIcon className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* "Take the Tour" Button */}
          <div className="mt-36">
            <motion.div
              initial={{
                scale: 1,
                borderRadius: "20%",
              }}
              whileHover={{
                scale: [1, 1.2, 1, 1.2, 1, 1.2, 1],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              whileTap={{
                scale: [1, 1],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeatType: "loop",
              }}
            >
              <Button
                onClick={scrollToExplore}
                className="mr-3 mt-6 inline-flex items-center gap-2 rounded-full bg-white hover:bg-white hover:bg-opacity-10 px-6 py-3 text-sm font-medium text-white bg-opacity-10"
              >
                Take the Tour
                <CornerRightDown className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </main>
      </div>

      {/*Features Section */}

      <div className="bg-white flex flex-col items-center h-96 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-grow items-center justify-items-center">

          <div className="flex flex-col justify-center">
            <h1 id="target-section" className="text-5xl font-bold mb-4 text-secondary max-w-lg">
              Learn your way, at your own pace.
            </h1>
            <p className="text-xl text-secondary font-sans font-light max-w-lg mt-6">  
              Create custom workspaces with your own study materials. CICERO specializes and focuses only on what you tell it to.
            </p>
          </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-xl h-[650px] w-[600px] flex items-center justify-center">

            </div>
        </div>
        

        {/*Footer Section */}
        <footer className="bg-[#1a1a1a] py-6 px-6 text-[#c0c0c0] text-sm bg-opacity-50 w-full">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <p>&copy; 2024 CICERO. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <Link
                href="#"
                className="hover:text-[#f0f0f0] transition-colors duration-300 ease-in-out"
                prefetch={false}
              >
                About Us
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ArrowRightUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function FlashcardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 
          3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 
          1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 
          3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
      />
    </svg>
  );
}

function RightArrowCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

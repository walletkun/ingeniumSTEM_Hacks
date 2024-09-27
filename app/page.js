'use client'
import { Play } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

export default function Component() {
  {/*Main Page */}
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#000000] text-[#f0f0f0] font-mono">

      {/*Navbar */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="#" className="text-2xl font-bold" prefetch={false}>
          CICERO
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="auth/login"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#121212] hover:bg-[#e0e0e0] transition-colors duration-300 ease-in-out"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="auth/register"
            className="rounded-full bg-[#000000] px-4 py-2 text-sm font-medium hover:bg-[#1a1a1a] transition-colors duration-300 ease-in-out"
            prefetch={false}
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/*Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-4 mt-8">
          <h1 className="text-5xl font-semibold">
            <TypeAnimation
              sequence = {[
                'Meet CICERO',
                1000
              ]}
              wrapper="span"
              speed={30}
              style= {{ fontSize: '1.3em', display: 'inline-block' }}
            />
          </h1>
            <p className="text-[#c0c0c0]">
              <TypeAnimation
                sequence = {[
                  '"I need help practicing integrals, can you help?"',
                  1000,
                  '"Hey Cicero, can we review for my Operating Systems final?"',
                  1000,
                  '"Can you highlight the important parts of Chapter 1 from this textbook?"',
                  1000,
                  '"Can you give me a concise summary of this PDF document?"',
                  1000,
                  '"Quiz me on South American history."',
                  1000,
                  '"Generate me flashcards on pages 4-7 from this PDF."',
                  1000
                ]}
                wrapper="span"
                speed={60}
                style= {{ fontSize: '1.3em', display: 'inline-block' }}
                repeat={Infinity}
              />
            </p>
            <Link
              href="auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#121212] hover:bg-[#e0e0e0] shadow-lg transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Try CICERO
              <ArrowRightUpIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-md font-medium text-[#ffffff] hover:bg-[#1a1a1a] shadow-lg ml-2 transition-colors duration-300 ease-in-out"
              prefetch={false}
            >
              Learn about the developers
              <RightArrowCircleIcon className="h-5 w-5" />
            </Link>
        </div>
        
        {/*Overview Section */}
        <div className="mt-32 bg-[#1a1a1a] rounded-lg p-6 text-left max-w-3xl">
          <h2 className="text-2xl font-bold">Meet Your AI Tutor</h2>
            <p className="text-[#c0c0c0] mt-2">
              CICERO is your personal AI assistant, designed to help you master any subject. With advanced natural
              language processing and machine learning algorithms, CICERO can analyze your study materials, create
              personalized practice tests, and generate flashcards to optimize your learning experience.
            </p>
        </div>

        {/*Video Preview Section */}
        <div className="relative mt-40 w-full max-w-4xl">
          <h2 className="text-2xl font-bold absolute top-[-40px] left-4 flex mb-4">Video Preview </h2>
          <div className="border border-[#3f3f3f] rounded-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                src=""
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>


        {/*Features Section */}
        <div className="mt-28 mb-20 w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-4 ml-5">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
              <FileIcon className="h-8 w-8" />
              <h3 className="text-lg font-medium">Upload PDFs</h3>
              <p className="text-[#c0c0c0] text-center">
                Easily upload your study materials and let CICERO analyze them.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
              <FilePenIcon className="h-8 w-8" />
              <h3 className="text-lg font-medium">Create practice tests</h3>
              <p className="text-[#c0c0c0] text-center">
                Generate personalized practice tests to assess your knowledge.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
              <FlashcardsIcon className="h-8 w-8" />
              <h3 className="text-lg font-medium">Generate flashcards</h3>
              <p className="text-[#c0c0c0] text-center">Automatically create flashcards from your study materials.</p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
              <TrophyIcon className="h-8 w-8" />
              <h3 className="text-lg font-medium">Track progress</h3>
              <p className="text-[#c0c0c0] text-center">Earn achievements and monitor your learning progress.</p>
            </div>
          </div>
        </div>
      </main>

      {/*Footer Section */}
      <footer className="bg-[#1a1a1a] py-6 px-6 text-[#c0c0c0] text-sm">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <p>&copy; 2024 CICERO. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#f0f0f0] transition-colors duration-300 ease-in-out" prefetch={false}>
              About Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

{/*Icon Functions */}
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
  )
}


function FileIcon(props) {
  return (
    <svg {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      class="size-6"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 
          7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 
          0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" 
      />
    </svg>
  )
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
  )
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
  )
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
  )
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
  )
}





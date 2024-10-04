import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PrefixPathnameNormalizer } from "next/dist/server/future/normalizers/request/prefix";

export const HomePage = () => {
    return (
    (<div className="flex flex-col min-h-screen bg-black text-[#f0f0f0] font-mono">
        <header className="py-6 px-8 border-b border-primary">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/" className="text-2xl font-semibold" prefetch={false}>
                    CICERO
                </Link>
            </div>
            <nav className="flex items-center gap-4">
                <p className="text-sm font-semibold ml-2">Need Help?</p>
                    <Link href="/helpPage" passHref>
                        <Button variant="ghost" size="icon">
                            <CircleHelpIcon className="h-5 w-5" />
                            <span className="sr-only">Help</span>
                        </Button>
                    </Link>
            </nav>
            </div>
        </header>
        <main className="flex-1 py-12 px-8">
            <h2 className="text-3xl font-bold mb-8 ml-2">Your Workspaces</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <CalculatorIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Calculus ll</h3>
                <p className="text-sm text-[#999]">MATH. 2501 w/ Mark Gibson</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <GlobeIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Latin American History</h3>
                <p className="text-sm text-[#999]">No description.</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <LibraryIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Literature</h3>
                <p className="text-sm text-[#999]">ENGL. 1010</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <BeakerIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Chemistry</h3>
                <p className="text-sm text-[#999]">CHEM. 2520, chemical bonding and nomenclature.</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <CodeIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Paradigms in C++</h3>
                <p className="text-sm text-[#999]">CISC. 3142 w/ Basak Taylan</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <LanguagesIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Japanese</h3>
                <p className="text-sm text-[#999]">For my upcoming trip to Japan.</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <TerminalIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Operating Systems</h3>
                <p className="text-sm text-[#999]">CISC. 3320 w/ a borderline homosexual with no biddies.</p>
            </Link>
            <Link href="#" className="bg-[#222] rounded-lg p-6 hover:bg-[#333] transition-colors" prefetch={false}>
                <div className="flex items-center justify-between mb-4">
                <RocketIcon className="w-8 h-8" />
                <ArrowRightIcon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Aerospace Engineering</h3>
                <p className="text-sm text-[#999]">Just for fun.</p>
            </Link>
            </div>
        </main>
        <footer className="py-6 px-8 border-t border-primary text-sm text-[#999]">
            <div className="flex items-center justify-between">
            <p className="font-mono">&copy; 2024 CICERO. All rights reserved.</p>
            <nav className="flex items-center gap-4">
                
            </nav>
            </div>
        </footer>
        </div>)
    );
}

    function ArrowRightIcon(props) {
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
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
        </svg>
    )
    }


    function BeakerIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 
            4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 
            12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 
            0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" 
            />
        </svg>
    )
}



    function CalculatorIcon(props) {
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
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" x2="16" y1="6" y2="6" />
        <line x1="16" x2="16" y1="14" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
        </svg>
    )
    }


    function CodeIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        width="24"
        height="24"
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" 
            />
        </svg>
    )
}


    function GlobeIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        width="24"
        height="24"
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor" 
        >
            <path 
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 
            1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 
            1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 
            1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 
            1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 
            9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" 
            />
        </svg>
    )
}


    function LanguagesIcon(props) {
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
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
        </svg>
    )
    }


    function LibraryIcon(props) {
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
        <path d="m16 6 4 14" />
        <path d="M12 6v14" />
        <path d="M8 8v12" />
        <path d="M4 4v16" />
        </svg>
    )
    }


    function RocketIcon(props) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 
            5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 
            2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 
            4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" 
            />
        </svg>

    )
    }



function CircleHelpIcon(props) {
return (
    (<svg
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
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />            
        <path d="M12 17h.01" />
        </svg>)
    )
}

function TerminalIcon(props) {
    return (
        <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor"
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 
            6v12a2.25 2.25 0 0 0 2.25 2.25Z" 
            />
        </svg>
    )
}
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

export const Tutor = () => {
  return (
    (<div className="flex min-h-screen w-full bg-background">
      {/*Saved Chats Sidebar */}
      <div className="hidden w-[260px] flex-col bg-black p-4 md:flex border-r border-r-primary">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-[52px]">Chat Sessions</h3>
          <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary mb-[52px]">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Create New Chat</span>
          </Button>
        </div>
      </div>

      {/*Chat Screen Navbar */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between bg-#000000 px-4 py-3 md:px-6 border-b border-b-primary">
          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-sm font-semibold text-center ml-3">
                Workspace: <span className="bg-muted rounded-xl inline-block px-2 py-1 ml-2">Operating Systems</span>
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Need Help?</p>
            <Link href="#" passHref>
              <Button variant="ghost" size="icon">
                <CircleHelpIcon className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </Link>
          </div>
        </div>

        {/*Main Chat Screen */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-secondary">
          
        </div>

        {/*Textfield */}
        <div className="sticky bottom-0 bg-secondary px-4 py-3 md:px-6">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              name="message"
              id="message"
              rows={1}
              className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16" />
            <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
              <SendIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>

      {/*Saved Documents Sidebar */}
      <div className="hidden w-[260px] flex-col bg-background p-4 md:flex border-l border-l-primary">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold ml-3">Saved Documents</h3>
        </div>
        
      </div>
    </div>)
  );
}

{/*Icon Functions */}
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
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>)
  );
}


function PlusIcon(props) {
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
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function SendIcon(props) {
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
      strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>)
  );
}


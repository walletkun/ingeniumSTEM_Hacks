import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export function tutor() {
  return (
    (<div className="flex min-h-screen w-full bg-background">
      <div className="hidden w-[260px] flex-col border-r bg-background p-4 md:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookIcon className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Tutoring Subjects</h3>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Add Subject</span>
          </Button>
        </div>
        <div className="mt-4 flex-1 overflow-auto">
          <div className="grid gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              prefetch={false}>
              <BookIcon className="h-5 w-5" />
              <span>Mathematics</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              prefetch={false}>
              <BookIcon className="h-5 w-5" />
              <span>English</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              prefetch={false}>
              <BookIcon className="h-5 w-5" />
              <span>History</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              prefetch={false}>
              <BookIcon className="h-5 w-5" />
              <span>Science</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              prefetch={false}>
              <BookIcon className="h-5 w-5" />
              <span>Geography</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div
          className="flex items-center justify-between border-b bg-background px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="Cicero" />
              <AvatarFallback>CI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Cicero</h3>
              <p className="text-sm text-muted-foreground">AI Tutor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <CircleHelpIcon className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="You" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-bold">You</div>
                <div className="prose text-muted-foreground">
                  <p>Hello Cicero, I'm struggling with my math homework. Can you help me?</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Cicero" />
                <AvatarFallback>CI</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-bold">Cicero</div>
                <div className="prose text-muted-foreground">
                  <p>
                    Of course, I'd be happy to help you with your math homework. What specific topic are you struggling
                    with?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-background px-4 py-3 md:px-6">
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
      <div className="hidden w-[260px] flex-col border-l bg-background p-4 md:flex">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Navigation</h3>
        </div>
        <div className="mt-4 flex-1 space-y-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            prefetch={false}>
            <LayoutGridIcon className="h-5 w-5" />
            <span>Flashcards</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            prefetch={false}>
            <RepeatIcon className="h-5 w-5" />
            <span>Review</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            prefetch={false}>
            <ActivityIcon className="h-5 w-5" />
            <span>Practice Tests</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            prefetch={false}>
            <TrophyIcon className="h-5 w-5" />
            <span>Achievements</span>
          </Link>
        </div>
      </div>
    </div>)
  );
}

function ActivityIcon(props) {
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
      <path
        d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>)
  );
}


function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>)
  );
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
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>)
  );
}


function LayoutGridIcon(props) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
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


function RepeatIcon(props) {
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
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
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


function SettingsIcon(props) {
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
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function TrophyIcon(props) {
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>)
  );
}

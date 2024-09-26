import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] bg-[#1a1a1a] text-white">
      <div className="flex flex-col items-center justify-center flex-1 p-8 md:p-12 lg:p-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">CICERO</h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Your personal AI tutor, here to help you learn and grow.
          </p>
          <Link
            href="auth/register"
            className="inline-flex items-center justify-center rounded-full bg-[#6b49c8] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#5a3ea5] focus:outline-none focus:ring-2 focus:ring-[#6b49c8] focus:ring-offset-2"
            prefetch={false}
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="hidden flex-1 bg-[#6b49c8] rounded-l-[100px] md:block">
        <img
          src="/placeholder.svg"
          alt="Video Preview"
          width="800"
          height="600"
          className="h-full w-full object-cover rounded-l-[100px]"
          style={{ aspectRatio: "800/600", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}

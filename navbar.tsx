import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 mr-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-meyYLC08J07PNnJtKgTRptgHhPktJ6.png"
                  alt="ExamWell Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">ExamWell</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/problems" className="hover:text-blue-200 transition-colors">
              Problems
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Products
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Worksheets
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Resources
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Support
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-blue-600">
              Log In
            </Button>
            <Button className="bg-white text-blue-700 hover:bg-blue-100">Sign Up</Button>
          </div>

          <div className="md:hidden">
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}


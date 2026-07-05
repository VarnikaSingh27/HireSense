"use client";

import { User } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

export function Header() {
  const pathname = usePathname();
  const isHr = pathname?.startsWith("/h/");

  return (
    <header className="flex items-center justify-between px-6 h-14 border-b transition-all duration-300 ease-in-out bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Welcome, User</h2>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
            <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            
            <DropdownMenuItem asChild>
              <Link 
                href={isHr ? "/h/dashboard" : "/u/dashboard"} 
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg block transition"
              >
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link 
                href={isHr ? "/h/dashboard" : "/u/settings"} 
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-lg block transition"
              >
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            
            <DropdownMenuItem asChild>
              <LogoutLink 
                className="w-full px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer rounded-lg block transition font-medium"
              >
                Sign out
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

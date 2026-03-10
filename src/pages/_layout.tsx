import { Outlet, Link } from "react-router";
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  LogOut,
  MessageSquare,
  Smartphone,
  User,
} from "lucide-react";
import { RedditIcon } from "@/components/icons/svgIcons";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useUserStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-[#edeff1] flex items-center px-4 gap-2">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5 shrink-0 mr-4">
        <RedditIcon className="w-8 h-8" />
        <span className="font-bold text-[#1c1c1c] text-lg hidden sm:block tracking-tight">
          reddit
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <label className="flex items-center bg-[#f6f7f8] border border-[#edeff1] hover:border-[#0079d3] hover:bg-white focus-within:border-[#0079d3] focus-within:bg-white rounded-full px-4 h-9 gap-2 transition-colors cursor-text">
          <Search className="w-4 h-4 text-[#878a8c] shrink-0" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="bg-transparent text-sm outline-none w-full text-[#1c1c1c] placeholder:text-[#878a8c]"
          />
        </label>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto shrink-0">
        {user ? (
          <>
            <button className="hidden md:flex items-center gap-1.5 px-3 h-8 rounded border border-[#edeff1] text-[#878a8c] hover:bg-[#f6f7f8] text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Create
            </button>

            <button className="w-8 h-8 flex items-center justify-center rounded text-[#878a8c] hover:bg-[#f6f7f8] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-[#878a8c] hover:bg-[#f6f7f8] transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-1.5 pl-1.5 pr-2 h-8 border border-transparent hover:border-[#edeff1] hover:bg-[#f6f7f8] rounded transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.firstName[0].toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start leading-none">
                  <span className="text-xs font-medium text-[#1c1c1c] max-w-[80px] truncate">
                    {user.firstName}
                  </span>
                  <span className="text-[10px] text-[#878a8c] mt-0.5">
                    1 karma
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-[#878a8c]" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-60 bg-white border border-[#edeff1] rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-3 border-b border-[#edeff1] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-base font-bold shrink-0">
                        {user.firstName[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1c1c1c] truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-[#878a8c] truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="py-1 border-b border-[#edeff1]">
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#1c1c1c] hover:bg-[#f6f7f8] transition-colors">
                        <User className="w-4 h-4 text-[#878a8c]" />
                        Profile
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#1c1c1c] hover:bg-[#f6f7f8] transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-[#878a8c]" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button className="hidden lg:flex items-center gap-1.5 px-3 h-8 text-[#878a8c] hover:bg-[#f6f7f8] rounded text-sm font-medium transition-colors">
              <Smartphone className="w-4 h-4" />
              Get app
            </button>
            <Link
              to="/login"
              className="px-4 h-8 flex items-center border border-[#ff4500] text-[#ff4500] rounded-full text-sm font-bold hover:bg-orange-50 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 h-8 flex items-center bg-[#ff4500] text-white rounded-full text-sm font-bold hover:bg-[#e03d00] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#dae0e6]">
      <Navbar />
      <main className="pt-12">
        <Outlet />
      </main>
    </div>
  );
}

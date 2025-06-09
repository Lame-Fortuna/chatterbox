import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" border-b shadow-2xl fixed w-full top-0 z-40 
    bg-white/85 backdrop-blur-sm bg-base-100/80 text-blue-950"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-lg font-bold ">Chatterbox</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 bg-inherit  text-blue-950`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline ">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
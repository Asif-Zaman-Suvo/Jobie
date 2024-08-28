import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo-1.png" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)} variant={"blue"}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {/* add a condition */}
            <Button className="rounded-full" variant={"destructive"}>
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
            <Link to={"/post-job"}></Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <SignIn
            signUpForceRedirectUrl={"/onboarding"}
            fallbackRedirectUrl={"/onboarding"}
          ></SignIn>
        </div>
      )}
    </>
  );
};

export default Header;

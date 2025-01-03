import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { UserAuthForm } from "./userAuth";

function TermsAndPrivacy() {
  return (
    <p className="text-sm text-center text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <Link
        to="/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        to="/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}

export default function AuthenticationPage() {
  return (
    <>
      {/* Mobile and Small Screens */}
      <div className="flex flex-col md:hidden items-center justify-center px-6 py-10 space-y-6 bg-muted min-h-screen">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-2xl font-bold text-center">
            Welcome to Acme Inc
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Please log in or create an account to continue.
          </p>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full max-w-xs py-2 text-center text-sm font-medium rounded-md"
          )}
        >
          Login
        </Link>

        {/* Divider */}
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted-foreground" />
          </div>
          <div className="relative text-center">
            <span className="px-2 bg-muted text-sm text-muted-foreground">
              OR
            </span>
          </div>
        </div>

        {/* User Auth Form */}
        <div className="w-full max-w-xs">
          <UserAuthForm />
        </div>

        {/* Footer */}
        <TermsAndPrivacy />
      </div>

      {/* Desktop and Larger Screens */}
      <div className="hidden md:grid container h-screen place-items-center">
        {/* Login Button */}
        <Link
          to="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>

        {/* Main Content */}
        <div className="flex items-center justify-center w-full">
          <div className="w-full max-w-md space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>

            {/* User Auth Form */}
            <UserAuthForm />

            {/* Footer */}
            <TermsAndPrivacy />
          </div>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bokor } from "next/font/google"
import { SigninButton } from "@/components/auth/signin-button";

const font = Bokor({
  subsets: ['latin'],
  weight: ['400']
})

export default function LandingPage() {
  return (
    <div className=" min-h-screen flex flex-col items-center container py-6">
      <h1 className={`${font.className} font-bold text-6xl tracking-wider`}>Welcome User!</h1>
      <div className="flex-1 flex flex-col justify-center items-center gap-4">
        <p className="">
          Please login to access secondly</p>
        <SigninButton>
          <Button>
            Sign in
          </Button>
        </SigninButton>
      </div>
    </div>
  );
}

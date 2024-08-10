"use client"
import { useRouter } from "next/navigation"

interface SigninButtonProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
}

export const SigninButton = ({ children, mode ="redirect", asChild }: SigninButtonProps) => {
    const router = useRouter()

    const onClick = () => {
        router.push("/sign-in")
    }

    if(mode === "modal"){
        return (
            <span>
                TODO: MODAL IMPLEMENTATAION
            </span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}
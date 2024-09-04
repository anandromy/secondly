"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    name: string,
    icon: React.ReactNode
}

export const Navlink = ({ name, icon: Icon }: Props) => {
    const pathname = usePathname()
    const href = name.toLowerCase()

    return(
        <Link href={href} className={`flex items-center gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 px-3 rounded-md
        ${pathname === `/${href}` && "text-blue-600 hover:text-blue-600"}
        `}>
            {Icon} {name}
        </Link>
    )
}
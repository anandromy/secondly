import Link from "next/link"
import { CheckSquareIcon, Clock, BoxIcon } from "lucide-react"

export const Dashboard = () => {
    return(
        <div className="p-6 pr-3 flex flex-col w-[270px] border-r">
            <nav className="text-sm">
                <ul className="space-y-4"> 
                    <Link href="focus" className="p-3 hover:bg-muted rounded-md cursor-pointer flex gap-2 items-center font-semibold">
                        <Clock className="h-5 w-5" />
                        Focus
                    </Link>
                    <Link href="tasks" className="p-3 hover:bg-muted rounded-md cursor-pointer flex gap-2 items-center">
                        <CheckSquareIcon className="h-5 w-5" />
                        Tasks
                    </Link>
                    <Link href="projects" className="p-3 hover:bg-muted rounded-md cursor-pointer flex gap-2 items-center">
                        <BoxIcon className="h-5 w-5" />
                        Projects
                    </Link>
                </ul>
            </nav>
        </div>
    )
}
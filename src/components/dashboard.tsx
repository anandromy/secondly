import Link from "next/link"
import { CheckSquareIcon, Clock, BoxIcon, SproutIcon } from "lucide-react"

export const Dashboard = () => {
    return(
        <div className="p-6 pr-3 flex flex-col w-[270px] border-r pt-10">
            <nav>
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
                    <Link href="habits" className="p-3 hover:bg-muted rounded-md cursor-pointer flex gap-2 items-center">
                        <SproutIcon className="h-5 w-5" />
                        Habits
                    </Link>
                </ul>
            </nav>
        </div>
    )
}
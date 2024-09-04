import { User2Icon, BellIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/dashboard/navigation"

export const Dashboard = () => {
    return(
        <div className="border-r h-full py-5 flex flex-col gap-8">
            <div className="flex items-center px-5">
                <ClockIcon />
                <span className="font-semibold text-xl tracking-tight mr-10 ml-2">secondly</span>
                <Button variant="ghost" className="rounded-full p-0 px-2">
                    <User2Icon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" className="rounded-full p-0 px-2">
                    <BellIcon className="h-5 w-5" />
                </Button>
            </div>
            <Navigation />
            <div className="space-y-6 py-3 px-5">
                <p>Community</p>
                <p>Request features</p>
            </div>
        </div>
    )
}
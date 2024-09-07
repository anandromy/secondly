import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export const AddTask = () => {
    return(
        // <div className={`flex items-center gap-1 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md transition-colors px-4 py-2  hover:text-blue-500`}>
        //     <PlusIcon className="w-4 h-4" />
        //     <span>Add task</span>
        // </div>
        <Button variant="ghost" className="hover:text-blue-500">
            <PlusIcon className="h-4 w-4"/> Add task
        </Button>
    )
}
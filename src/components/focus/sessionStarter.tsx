import { Button } from "@/components/ui/button"
import { RocketIcon } from "lucide-react"

type Props = {
    taskId: string | null
    handleClick: () => void
}

export const SessionStarter = ({ taskId, handleClick }: Props) => {
    return(
        <div className="border rounded-md px-6 py-6">
            <div className="h-32">
                {/* TODO: ADDING SCALE TO CHOOSE SESSION DURATION */}
            </div>
            <Button className="w-full font-semibold space-x-2 text-md" disabled={!taskId} onClick={handleClick}>
                <RocketIcon className="h-4 w-4" />
                <span>Start</span>
            </Button>
        </div>
    )
}
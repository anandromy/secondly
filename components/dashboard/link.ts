
import { LucideIcon, CheckSquareIcon, BoxIcon, GoalIcon, LeafIcon, PaperclipIcon, LightbulbIcon, StarIcon, FilterIcon, AlarmClockIcon } from "lucide-react"

export const links: Array<{
    name: string,
    icon: LucideIcon
}> = [
    {
        name: "Focus",
        icon: AlarmClockIcon
    },{
        name: "Tasks",
        icon: CheckSquareIcon
    },{
        name: "Projects",
        icon: BoxIcon
    },{
        name: "Goals",
        icon: GoalIcon
    }, {
        name: "Habits",
        icon: LeafIcon
    }, {
        name: "Ideas",
        icon: LightbulbIcon
    }, {
        name: "Principles",
        icon: PaperclipIcon
    }, {
        name: "Vision",
        icon: StarIcon
    }, {
        name: "Preferences",
        icon: FilterIcon
    }
]
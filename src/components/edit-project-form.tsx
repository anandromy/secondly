import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "@/components/ui/separator"

type Props = {
    name?: string,
    id?: string,
    setIsEditing: (x: boolean) => void
}

export const EditProject = ({name, id, setIsEditing }: Props) => {
    return(
        <div className="border rounded-xl py-3">
            <form className="space-y-3">
                <div className="px-3">
                    <input placeholder="Project Name" defaultValue={name} className="flex h-16 w-full rounded-md bg-background px-3 py-2 focus:outline-none" />
                </div>
                <Separator />
                <div className="flex items-center justify-between px-3">
                    <Button variant="destructive" className="ml-3">Delete</Button>
                    <div className="flex gap-3 items-center">
                        <Button variant="outline" onClick={(e) => {
                            e.preventDefault()
                            setIsEditing(false)
                        }}>Cancel</Button>
                        <Button type="submit" variant="default">Save</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
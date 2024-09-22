import { DateSelector } from "@/components/selectors/dateSelector"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Project } from "@prisma/client"
import { FilterIcon, Square } from "lucide-react"
import { useEffect, useState } from "react"

export const Filter = () => {
    const [ projects, setProjects ] = useState<Project[]>([])
    const [ selectedProjects, setSelectedProjects ] = useState<Project[]>([])
    const [ selectedDeadline, setSelectedDeadline ] = useState<Date>()
    const [ status, setStatus ] = useState<string>()
    const [ keyword, setKeyword ] = useState<string>()

    useEffect(() => {
        const fetchProjects = async() => {
            const res = await fetch("http://localhost:3000/api/project", {
                method: "GET"
            })
            const data = await res.json()
            if(data.success) {
                setProjects(data.projects)
            }
        }
        fetchProjects()
    }, [])

    return(
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hover:text-blue-500">
                        <FilterIcon className="h-4 w-4 mr-1" />
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="text-sm">
                        <DropdownMenuLabel>
                            Status
                        </DropdownMenuLabel>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} checked={status === "done"} onCheckedChange={(checked: boolean) => {
                            if(checked) {
                                setStatus("done")
                            }else {
                                setStatus(undefined)
                            }
                        }} className="cursor-pointer">
                            <Square className="bg-green-500 text-green-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">Done</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} checked={status === "backlog"} onCheckedChange={(checked) => {
                            if(checked) {
                                setStatus("backlog")
                            } else {
                                setStatus(undefined)
                            }
                        }} className="cursor-pointer">
                            <Square className="bg-red-500 text-red-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">Backlog</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} checked={status === "todo"} onCheckedChange={(checked) => {
                            if(checked) {
                                setStatus("todo")
                            } else {
                                setStatus(undefined)
                            }
                        }} className="cursor-pointer">
                            <Square className="bg-gray-500 text-gray-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">To do</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} checked={status === "in_progress"} onCheckedChange={(checked) => {
                            if(checked) {
                                setStatus("in_progress")
                            } else {
                                setStatus(undefined)
                            }
                        }} className="cursor-pointer">
                            <Square className="bg-yellow-500 text-yellow-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">In progress</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="font-semibold">Projects</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {projects.map((project) => (
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Checkbox checked={selectedProjects.includes(project)} onCheckedChange={() => {
                                            if(selectedProjects.includes(project)){
                                                const newArray = selectedProjects.filter((item) => project.id !== item.id)
                                                setSelectedProjects(newArray)
                                            } else {
                                                setSelectedProjects([...selectedProjects, project])
                                            }
                                        }} className="mr-2"/>
                                        <span className="mr-1">{project.icon}</span>
                                        <span>{project.name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DateSelector date={selectedDeadline} setDate={setSelectedDeadline} deadline={true}/>
            </div>
            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search here"/>
        </div>
    )
}
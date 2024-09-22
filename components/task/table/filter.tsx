import { DateSelector } from "@/components/selectors/dateSelector"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Project, Status } from "@prisma/client"
import { ColumnFiltersState } from "@tanstack/react-table"
import { FilterIcon, Square } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
    columnFilters: ColumnFiltersState,
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}

export const Filter = ({ columnFilters, setColumnFilters }: Props) => {
    const [ projects, setProjects ] = useState<Project[]>([])
    const [ selectedProjects, setSelectedProjects ] = useState<string[]>([])
    const [ selectedDeadline, setSelectedDeadline ] = useState<Date>()
    const [ selectedStatuses, setSelectedStatuses ] = useState<Status[]>([])

    const taskName = columnFilters.find(f => f.id === "name")?.value || ''
    const filterChange = (id: string, value: typeof taskName) => {
        setColumnFilters(prev => prev.filter(f => f.id !== id).concat({
            id,
            value
        }))
    }

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

    useEffect(() => {
        setColumnFilters(prev => {
            const newFilters = prev.filter(f => f.id !== 'status' && f.id !== 'Project.id')
            if (selectedStatuses.length > 0) {
                newFilters.push({ id: 'status', value: selectedStatuses })
            }
            if (selectedProjects.length > 0) {
                newFilters.push({ id: 'Project.id', value: selectedProjects })
            }
            return newFilters
        })
    }, [selectedStatuses, selectedProjects, setColumnFilters])

    const toggleStatus = (status: Status) => {
        setSelectedStatuses(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status)
                : [...prev, status]
        )
    }

    const toggleProject = (projectId: string) => {
        setSelectedProjects(prev => 
            prev.includes(projectId)
                ? prev.filter(id => id !== projectId)
                : [...prev, projectId]
        )
    }

    // TODO: APPLY A DEADLINE FILTER: PROBLEM: DEADLINE NEEDS TO BE NOT SET TO 00 WHEN USER PICKS A DATE

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
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} 
                            checked={selectedStatuses.includes('done')} 
                            onCheckedChange={() => toggleStatus('done')} 
                            className="cursor-pointer">
                            <Square className="bg-green-500 text-green-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">Done</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} 
                            checked={selectedStatuses.includes('backlog')} 
                            onCheckedChange={() => toggleStatus('backlog')} 
                            className="cursor-pointer">
                            <Square className="bg-red-500 text-red-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">Backlog</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} 
                            checked={selectedStatuses.includes('todo')} 
                            onCheckedChange={() => toggleStatus('todo')} 
                            className="cursor-pointer">
                            <Square className="bg-gray-500 text-gray-500 h-4 w-4 mr-4 rounded-sm" />
                            <span className="hover:text-blue-500">To do</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()} 
                            checked={selectedStatuses.includes('in_progress')} 
                            onCheckedChange={() => toggleStatus('in_progress')} 
                            className="cursor-pointer">
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
                                    <DropdownMenuItem key={project.id} onSelect={(e) => e.preventDefault()}>
                                        <Checkbox checked={selectedProjects.includes(project.id)} onCheckedChange={() => toggleProject(project.id)} className="mr-2"/>
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
            <DateSelector date={selectedDeadline} setDate={(date) => {
                setSelectedDeadline(date)
                // setColumnFilters((prev) => {
                //     const newFilters = prev.filter(f => f.id !== "deadline")
                //     if(selectedDeadline) {
                //         newFilters.push({
                //             id: "deadline",
                //             value: selectedDeadline
                //         })
                //     }
                //     return newFilters
                // })
            }} deadline={true} />
            </div>
            <Input onChange={(e) => filterChange('name', e.target.value)} placeholder="Search here"/>
        </div>
    )
}
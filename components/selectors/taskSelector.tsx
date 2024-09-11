"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Task } from "../task/columns"
import { CheckboxIcon } from "@radix-ui/react-icons"
import { BoxIcon, ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Project } from "@prisma/client"


type Props = {
    setSelectedProjectId: Dispatch<SetStateAction<string | undefined>>
    setSelectedTaskId: Dispatch<SetStateAction<string | undefined>>
}

export const TaskSelector = ({ setSelectedProjectId, setSelectedTaskId }: Props) => {
    const [ tasks, setTasks ] = useState<Task[]>()
    const [ selectedTask, setSelectedTask ] = useState<Task>()
    const [ isSelectingTask, setIsSelectingTask ] = useState<boolean>(false)
    const [ projects, setProjects ] = useState<Project[]>()
    const [ selectedProject, setSelectedProject ] = useState<Project>()
    const [ isSelectingProject, setIsSelectingProject ] = useState<boolean>(false)

    useEffect(() => {
        const fetchTasks = async () => {
            if(selectedProject?.id){
                const res = await fetch("http://localhost:3000/api/task/getTask", {
                    method: "POST",
                    body: JSON.stringify(selectedProject.id)
                })
                const data = await res.json()
                if(res.ok) {
                    setTasks(data.tasks)
                }
            } else {
                const res = await fetch("http://localhost:3000/api/task/getTask", {
                    method: "GET"
                })
                const data = await res.json()
                if(res.ok) {
                    setTasks(data.tasks)
                }
            }
        }
        fetchTasks()
    }, [selectedProject])

    useEffect(() => {
        const fetchProjects = async() => {
            if(!selectedTask?.id) {
                const res = await fetch("http://localhost:3000/api/project", {
                    method: "GET"
                })
                const data = await res.json()
                if(res.ok) {
                    setProjects(data.projects)
                }
            } else {
                const res = await fetch("http://localhost:3000/api/project/getProject", {
                    method: "POST",
                    body: JSON.stringify(selectedTask.Project.id)
                })
                const data = await res.json()
                if(res.ok) {
                    setSelectedProject(data.project)
                }
            }
        }
        fetchProjects()
    }, [])

    return(
        <div className="space-y-3">
            <div className="border rounded-lg py-2 my-2">
                <div className="flex justify-between items-center px-3">
                    <div className="flex items-center hover:text-blue-500 cursor-pointer" onClick={() => setIsSelectingProject(!isSelectingProject)}>
                        {selectedProject ? (
                            <>
                               <span className="mr-2">{selectedProject.icon}</span>
                                {selectedProject.name}
                            </>
                        ): (
                            <>
                                <BoxIcon className="h-4 w-4 mr-2" />
                                <span>Select Project</span>
                            </>
                        )}
                    </div>
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer" onClick={() => setIsSelectingProject(!isSelectingProject)}>
                        {isSelectingProject? (
                            <ChevronUp className="h-4 w-4" />
                        ): (<ChevronDown className="h-4 w-4" />)}
                    </div>
                </div> 
                {isSelectingProject && (
                <div className="space-y-1 mt-2">
                    {
                        projects?.map((project) => (
                            <p key={project.id} className="cursor-pointer hover:bg-muted py-2 px-3" onClick={() => {
                                setSelectedProject(project)
                                setIsSelectingProject(!isSelectingProject)
                                setSelectedProjectId(project.id)
                            }}>
                            {project.icon} {project.name}
                            </p>
                        ))
                    }
                </div>
                )}
            </div>
            <div className="border rounded-lg py-2 my-2">
                <div className="flex justify-between items-center px-3">
                    <div className="flex items-center hover:text-blue-500 cursor-pointer" onClick={() => setIsSelectingTask(!isSelectingTask)}>
                        {selectedTask ? (
                            <>
                                <Checkbox className="mr-4" />
                                {selectedTask.name}
                            </>
                        ): (
                            <>
                                <CheckboxIcon className="h-4 w-4 mr-2" />
                                <span>Select task</span>
                            </>
                        )}
                    </div>
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer" onClick={() => setIsSelectingTask(!isSelectingTask)}>
                        {isSelectingTask ? (
                            <ChevronUp className="h-4 w-4" />
                        ): (<ChevronDown className="h-4 w-4" />)}
                    </div>
                </div>
                {isSelectingTask && (
                <div className="space-y-1 mt-2">
                    {
                        tasks?.map((task) => (
                            <p key={task.id} className="cursor-pointer hover:bg-muted py-2 px-3" onClick={() => {
                                setSelectedTask(task)
                                setIsSelectingTask(!isSelectingTask)
                                setSelectedTaskId(task.id)
                            }}>
                            {task.Project.icon} {task.name}
                            </p>
                        ))
                    }
                </div>
                )}
            </div>
        </div>
    )
}
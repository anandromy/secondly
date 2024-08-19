"use client"

import { EditProject } from "@/components/edit-project-form"
import { Project } from "@/components/project"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

const ProjectsPage = () => {
    const [ projects, setProjects ] = useState<any>()
    const [ isEditing,  setIsEditing ] = useState<boolean>(false)

    const fetchProjects = async () => {
        const res = await fetch("/api/project")
        const data = await res.json()
        setProjects(data.message)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return(
        <div className="w-full space-y-3 max-w-[600px] ml-20">
            <h1 className="text-3xl font-bold mb-10 px-3">Projects</h1>
            {
                projects && (
                    // TODO: ADD TYPES
                    // @ts-ignore
                    projects.map((project, index) => (
                        <Project key={index} defaultValue={project.name} id={project.id} />
                    ))
                )
            }
            <Input placeholder="Add new project" className={`border-none hover:bg-muted rounded-md cursor-pointer ${isEditing && "hidden"}`} onClick={() => setIsEditing(true)} />
            {
                isEditing && (
                    <EditProject setIsEditing={setIsEditing} />
                )
            }
        </div>
    )
}
export default ProjectsPage
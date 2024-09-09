"use client"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Project } from "@prisma/client"
import React, { Dispatch, SetStateAction } from "react"
import { useState } from "react"

type Props = {
    projects: Project[],
    setProjectId: Dispatch<SetStateAction<string>>
}

// TODO: BIGGER ICON IN TRIGGER CONTENT

export const ProjectSelector = ({ projects, setProjectId }: Props) => {
    const [ selectedIcon, setSelectedIcon ] = useState(projects[0].icon)
    return (
        <Select onValueChange={(value) => {
            const selectedProject = projects.find(p => p.id === value)
            if(selectedProject) {
                setSelectedIcon(selectedProject.icon)
            }
            setProjectId(value)
        }}>
            <SelectTrigger className="rounded-lg max-w-min">
                <SelectValue placeholder={selectedIcon} aria-label={selectedIcon}>
                    {selectedIcon}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {
                    projects.map((project) => (
                        <SelectItem key={project.id} value={project.id} className="cursor-pointer">
                            <span className="mr-2">{project.icon}</span>
                            <span>{project.name}</span>
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}
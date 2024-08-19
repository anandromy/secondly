"use client"

import { useState } from "react"
import { EditProject } from "./edit-project-form"
type Props = {
    defaultValue: string,
    id: string
}

export const Project = ({ defaultValue, id }: Props) => {
    const [ isEditing, setIsEditing ] = useState<boolean>(false)
    return(
        <div>
            <p className={`hover:bg-muted rounded-md cursor-pointer py-2 px-3 transition-all ${isEditing && "hidden"}`}
                onClick={() => setIsEditing(true)}
            >
                {defaultValue}
            </p>
            {isEditing && <EditProject setIsEditing={setIsEditing} name={defaultValue} />}
        </div>
    )
}
"use client"

import { EditProject } from "./edit-project-form"
type Props = {
    defaultValue: string,
    id: string,
    setIsEditing: (x: string | false) => void,
    isEditing?: string | false,
}

export const Project = ({ defaultValue, id, setIsEditing, isEditing }: Props) => {
    return(
        <div>
            <p className={`hover:bg-muted rounded-md cursor-pointer py-2 px-3 transition-all ${isEditing === id && "hidden"}`}
                onClick={() => setIsEditing(id)}
            >
                {defaultValue}
            </p>
            {isEditing === id && <EditProject name={defaultValue} id={id} setIsEditing={setIsEditing} />}
        </div>
    )
}
"use client"

import { Button } from "./ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

type Props = {
    name?: string,
    id?: string,
    setIsAdding?: (x: boolean) => void,
    setIsEditing?: (x: string | false) => void
}

export const EditProject = ({name, id, setIsAdding, setIsEditing }: Props) => {
    const [ userInput, setUserInput ] = useState<string>()
    const onSubmit = async () => {
        if(id) {
            const res = await fetch("/api/project", {
                method: "PUT",
                body: JSON.stringify({ id: id, name: userInput })
            })

            const data = await res.json()
            console.log(data)
            setIsEditing && setIsEditing(false)
        } else {
            const res = await fetch("/api/project", {
                method: "POST",
                body: JSON.stringify({ name: userInput })
            })

            const data = await res.json()
            console.log(data)
            setIsAdding && setIsAdding(false)
        }
    }

    const onDelete = async () => {
        console.log("ID: ", id)

        const res = await fetch("/api/project", {
            method: "DELETE",
            body: JSON.stringify({ id: id })
        })

        const data = await res.json()
        console.log(data)
        setIsEditing && setIsEditing(false)
    }

    return(
        <div className="border rounded-xl py-3">
            <form className="space-y-3">
                <div className="px-3">
                    <input placeholder="Project Name" defaultValue={name} className="flex h-16 w-full rounded-md bg-background px-3 py-2 focus:outline-none"
                        onChange={(e) => {
                            setUserInput(e.target.value)
                        }}
                    />
                </div>
                <Separator />
                <div className="flex items-center justify-between px-6">
                    { name && <Button variant="destructive" onClick={(e) => {
                        e.preventDefault()
                        onDelete()
                    }}>Delete</Button> }
                    <div className="flex gap-3 items-center">
                        <Button variant="outline" onClick={(e) => {
                            e.preventDefault()
                            setIsEditing && setIsEditing(false)
                            setIsAdding && setIsAdding(false)
                        }}>Cancel</Button>
                        <Button type="submit" variant="default" onClick={(e) => {
                            e.preventDefault()
                            onSubmit()
                        }}>Save</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
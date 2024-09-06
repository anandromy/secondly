"use client"
import { useForm } from "react-hook-form"
import { PlusIcon } from "lucide-react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"


const addProjectDataSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    icon: z.string().trim().min(1, "Icon is required")
})

export const AddProjectForm = () => {
    const [ adding, setAdding ] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit } = useForm<z.infer<typeof addProjectDataSchema>>({
        resolver: zodResolver(addProjectDataSchema)
    })

   const handleFormSubmit = async (data: z.infer<typeof addProjectDataSchema>) => {
    const res = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        body: JSON.stringify(data)
    })
    const response = await res.json()
    if (response.success) {
        toast.success(response.message)
    } else {
        toast.error(response.message)
    }
    setAdding(false)
   }

    return (
        <>
            <div className={`hover:bg-accent hover:text-accent-foreground max-w-2xl cursor-pointer rounded-md transition-colors px-4 py-2 space-x-2 hover:text-blue-500
                ${adding ? "hidden" : "flex"}`}
                onClick={() => setAdding(true)}
            >
                <PlusIcon className="w-[21.98px] h-[24px]" />
                <span>Add task</span>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)} className={`${adding ? "block" : "hidden"} max-w-2xl space-y-3 mt-4`}>
                <Input placeholder="Enter name of your project here" {...register("name")} />
                {errors.name && (
                    <span className="text-sm text-red-500 px-3 py-1">{errors.name.message}</span>
                )}
                <Input placeholder="Enter projects emoji here" {...register("icon")} />
                {errors.icon && (
                    <span className="text-sm text-red-500 px-3 py-1">{errors.icon.message}</span>
                )}
                <Button type="submit">Add Project</Button>
                <Button type="button" onClick={() => setAdding(false)} variant="outline">Cancel</Button>
            </form>
        </>
    )
}
"use client"
import { ProjectSelector } from "@/components/selectors/projectSelector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Project } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { CheckListItem } from "./checkListItem"
import { DateSelector } from "@/components/selectors/dateSelector"

type Props = {
    projects: Project[]
}

export type checkItem = {
    done: boolean,
    name: string
}

// TODO: AUTOSIZE INPUT BOX
export const AddTaskForm = ({ projects }: Props) => {
    const [ checkList, setCheckList ] = useState<Array<checkItem> | []>([])
    const [ projectId, setProjectId ] = useState<string>("")
    const [ taskName, setTaskName ] = useState<string>("")
    const [ description, setDescription ] = useState<string>("")
    const [ date, setDate ] = useState<Date>()
    const [ time, setTime ] = useState<string>()


    useEffect(() => {
        const storedCheckList = localStorage.getItem('checkList')
        if (storedCheckList) {
            setCheckList(JSON.parse(storedCheckList))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('checkList', JSON.stringify(checkList))
    }, [checkList])

    const handleCheckChange = (i: number) => {
        const newCheckList = checkList.map((item, index) => {
            if(i === index) {
                return {
                    ...item,
                    done: !(item.done)
                }
            } else {
                return item
            }
        })

        setCheckList(newCheckList)
    }

    const handleDelete = (i: number) => {
        const newCheckList = checkList.filter((item, index) => index !== i)
        setCheckList(newCheckList)
    }

    return(
        <form className="rounded-md max-w-2xl mx-auto" onSubmit={async (e) => {
            e.preventDefault()
            const res = await fetch("http://localhost:3000/api/task", {
                method: "POST",
                body: JSON.stringify({
                    taskName,
                    description,
                    projectId,
                    checkList,
                    isoDate: date,
                    time
                })
            })
            const message = await res.json()
            console.log(message)
        }}>
            <div className="flex gap-2 align-top justify-start border-b pb-4">
                <ProjectSelector projects={projects} setProjectId={setProjectId} />
                <Input placeholder="Task name" className="border-0 shadow-none focus-visible:ring-0" onChange={(e) => setTaskName(e.target.value)} />
            </div>
            <div className="border-b py-3">
                <Label className="pl-3">Description</Label>
                <Input placeholder="Describe your task" className="border-0 shadow-none focus-visible:ring-0" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="py-3 pl-3">
                <Label>Checklist</Label>
                {
                    checkList.map((item, index) => (
                        <CheckListItem checked={item.done} handleCheckChange={() => handleCheckChange(index)} handleDelete={() => handleDelete(index)} checkList={checkList} setCheckList={setCheckList} index={index} />
                    ))
                }
                <Button type="button" variant="outline" className="mt-2 flex gap-1" onClick={() => {
                    setCheckList([...checkList, {
                        name: "",
                        done: false
                    }])
                }}>
                    <PlusIcon className="h-4 w-4" />
                    Add an Item
                </Button>
            </div>
            <div className="pl-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <DateSelector date={date} setDate={setDate} />
                    <Input type="time" onChange={(e) => setTime(e.target.value)}/>
                </div>
                <div className="space-x-3">
                    <Button type="reset" variant="secondary">Reset</Button>
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </form>
    )
}
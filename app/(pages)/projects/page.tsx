import { addProject, getProjects } from "@/app/actions/project"
import { ProjectTab } from "@/components/project/projectTab"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

const ProjectsPage = async () => {

    const projects = await getProjects()

    const handleSubmit = (async () => {
        "use server"
        const res = await addProject({
            name: "Exercise for atleast 30 mins",
            icon: 'fhfewiuhruiwerwi💪__-__*&%$#'
        })

        console.log(res)
    })


    return(
       <Tabs defaultValue="projects" className="w-full md:px-6 space-y-6">
            <TabsList className="bg-background">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="report">Report</TabsTrigger>
                <div className="flex justify-end flex-1"><Button variant="outline" className="align-right">Filters</Button> </div>
            </TabsList>
            <TabsContent value="projects">
                <div className="space-y-1">
                    {
                        projects.map((item) => (
                            <ProjectTab name={item.name} icon={item.icon} />
                        ))
                    }
                </div>
                <Link href="add" className="hover:bg-accent hover:text-blue-600 flex max-w-2xl items-center cursor-pointer rounded-md transition-colors px-4 py-2 space-x-2">
                    <PlusIcon className="w-[21.98px] h-[24px]" />
                    <span>Add Project</span>
                </Link>
            </TabsContent>
            <TabsContent value="plan">This is your projects planning page</TabsContent>
            <TabsContent value="report" >This is your projects report page</TabsContent>
       </Tabs>
    )
}

export default ProjectsPage
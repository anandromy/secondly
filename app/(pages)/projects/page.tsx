import { getProjects } from "@/app/actions/project"
import { AddProjectForm } from "@/components/project/addProject"
import { ProjectTab } from "@/components/project/projectTab"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProjectsPage = async () => {

    const projects = await getProjects()

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
                            <ProjectTab key={item.name} name={item.name} icon={item.icon} />
                        ))
                    }
                </div>
                <AddProjectForm />
            </TabsContent>
            <TabsContent value="plan">This is your projects planning page</TabsContent>
            <TabsContent value="report" >This is your projects report page</TabsContent>
       </Tabs>
    )
}

export default ProjectsPage
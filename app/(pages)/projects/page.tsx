import { addProject, getProjects } from "@/app/actions/project"
import { Button } from "@/components/ui/button"

const ProjectsPage = async () => {

    const projects = await getProjects({
        userId: "cm014wqjp00002sqj2eoep8zu"
    })

    const handleSubmit = (async () => {
        "use server"
        const res = await addProject({
            userId: "cm014wqjp00002sqj2eoep8zu",
            name: "Exercise for atleast 30 mins",
            icon: 'fhfewiuhruiwerwi💪__-__*&%$#'
        })

        console.log(res)
    })


    return(
        <div>
            Hi, this is projects page
            <form action={handleSubmit}>
                <Button type="submit">Add Project</Button>
            </form>
        </div>
    )
}

export default ProjectsPage
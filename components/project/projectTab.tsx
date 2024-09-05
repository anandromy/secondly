
type Props = {
    name: string,
    icon: string
}

export const ProjectTab = ({ name, icon }: Props) => {
    return (
        <div className="hover:bg-accent hover:text-accent-foreground flex max-w-2xl cursor-pointer rounded-md transition-colors px-4 py-2 space-x-2">
            <span>{icon}</span>
            <span>{name}</span>
        </div>
    )
}
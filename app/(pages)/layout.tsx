import { Dashboard } from "@/components/dashboard/dashboard"

type Props = {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
    return(
        <div className="h-full flex">
            <Dashboard />
            <main className="py-5 px-6 flex-1">
                {children}
            </main>
        </div>
    )
}

export default ProtectedLayout
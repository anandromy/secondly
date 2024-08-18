import { Dashboard } from "@/components/dashboard"

interface Props {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
    return(
        <div className="min-h-screen flex">
            <Dashboard />
            <main className="flex-1 p-6">
                {children}
            </main>
            <footer className="w-[300px] flex items-center border rounded-md justify-center my-10 mr-20">
                the calendar
            </footer>
        </div>
    )
}

export default ProtectedLayout
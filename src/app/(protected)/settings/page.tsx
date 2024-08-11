import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
const SettingsPage = async () => {
    const session = await auth()
    return(
        <div>
            Settings Page
            Current Session: {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <Button className="mt-4 w-full max-w-md">
                    Sign out
                </Button>
            </form>
        </div>
    )
}

export default SettingsPage
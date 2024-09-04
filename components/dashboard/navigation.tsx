import React from "react"
import { links } from "@/components/dashboard/link"
import { Navlink } from "@/components/dashboard/navlink"

export const Navigation = () => {
    return(
        <div className="border-b pl-2 pr-5 flex-1">
            <nav>
                <ul className="space-y-2">
                    {
                        links.map((item) => (
                            <Navlink name={item.name} icon={React.createElement(item.icon, { className:"h-4 w-4" })}/>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}
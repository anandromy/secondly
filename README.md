## Points to remember
- The main layout has the height of screen by default, i.e. the body has min-h-screen by default in next app
### How to pass icons, when you have a constant list, a server component and a client component that takes icons as props:
```
const links: Array<{
    name: string,
    icon: LucideIcon
}> = [
    {
        name: "Focus",
        icon: AlarmClockIcon
    },{
        name: "Tasks",
        icon: CheckSquareIcon
    }]

const serverComponent = () => {
    return(
        <ul>
            {links.map((item) => (
                <Navlink name={item.name} icon={React.createElement(item.icon, { className: "h-4 w-4"})}>
            ))}
        </ul>
    )
}

```

***where, the Navlink component looks like this:***
```
"use client"


type Props = {
    name: string,
    icon: React.ReactNode
}

const Navlink = ({icon: Icon, name}: Props) => {
   return(
        <li className="flex items-center gap-2 cursor-pointer hover:bg-accent hover:text-accent-foreground py-2 px-3 rounded-md">
            {Icon} {name}
        </li>
    )
}

```

## Ideas/Plans

1. app/page.tsx -> Shows overview or marketing/landing page depending on whether the user is signed in or not.
2. all the folder/routes/pages/layouts inside the (pages) folder will be protected after implementing auth
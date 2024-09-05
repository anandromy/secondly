import { PrismaClient } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Make the extensions work

// const projectExtension = Prisma.defineExtension((client) => {
  // return client.$extends({
  //   model: {
  //     project: {
  //       // @ts-ignore
  //       async create(args) {

  //         console.log("Extension triggered")
  //         const emojis = args.data.icon.match(regex)
  //         console.log("These are the emojis the extension got: ", emojis, "and this is the type of emojis: ", typeof emojis)
  //         console.log("This is the length: ", emojis.length)

  //         if (emojis.length !== 1) {
  //           throw new Error("The length of icon must be one")
  //         }
  //         return client.project.create(args)
  //       }
  //     }
  //   }
  // })

  // return client.$extends({
  //   query: {
  //     project: {
  //       async create({ model, operation, args, query }) {
  //         console.log("Prisma create project triggered and this is the argument: ", args.data)
  //       }
  //     }
  //   }
  // })
// })

const PrismaClientSingleton = () => {
  // return new PrismaClient().$extends(projectExtension)

  return new PrismaClient()
}


declare global {
  var prisma: ReturnType<typeof PrismaClientSingleton> | undefined
}

export const db = globalThis.prisma || PrismaClientSingleton()

if(process.env.NODE_ENV !== "production") globalThis.prisma = db

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "taskId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

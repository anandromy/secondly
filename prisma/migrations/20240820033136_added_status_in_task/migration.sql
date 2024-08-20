/*
  Warnings:

  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Stauts" AS ENUM ('todo', 'backlog', 'done');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "Stauts" NOT NULL;

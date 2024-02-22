/*
  Warnings:

  - You are about to drop the column `Price` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "renewal_dayOf_Month" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("created_at", "id", "name", "renewal_dayOf_Month", "updated_at") SELECT "created_at", "id", "name", "renewal_dayOf_Month", "updated_at" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE INDEX "subscription_userId_index" ON "Subscription"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

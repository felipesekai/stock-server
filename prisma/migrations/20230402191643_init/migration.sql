/*
  Warnings:

  - You are about to drop the column `productId` on the `RegisterEntry` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `RegisterEntry` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ProductToRegisterEntry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToRegisterEntry_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToRegisterEntry_B_fkey" FOREIGN KEY ("B") REFERENCES "RegisterEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegisterEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "hour" INTEGER NOT NULL
);
INSERT INTO "new_RegisterEntry" ("date", "hour", "id") SELECT "date", "hour", "id" FROM "RegisterEntry";
DROP TABLE "RegisterEntry";
ALTER TABLE "new_RegisterEntry" RENAME TO "RegisterEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRegisterEntry_AB_unique" ON "_ProductToRegisterEntry"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRegisterEntry_B_index" ON "_ProductToRegisterEntry"("B");

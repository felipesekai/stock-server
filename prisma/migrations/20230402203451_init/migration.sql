/*
  Warnings:

  - You are about to drop the `_ProductToRegisterEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `RegisterEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `RegisterEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ProductToRegisterEntry_B_index";

-- DropIndex
DROP INDEX "_ProductToRegisterEntry_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProductToRegisterEntry";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegisterEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "hour" INTEGER NOT NULL,
    CONSTRAINT "RegisterEntry_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RegisterEntry" ("date", "hour", "id") SELECT "date", "hour", "id" FROM "RegisterEntry";
DROP TABLE "RegisterEntry";
ALTER TABLE "new_RegisterEntry" RENAME TO "RegisterEntry";
CREATE INDEX "RegisterEntry_productId_date_idx" ON "RegisterEntry"("productId", "date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

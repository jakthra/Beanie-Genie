ALTER TABLE "inventory" ADD COLUMN "purchaseBagIndex" INTEGER;
UPDATE "inventory" SET "purchaseBagIndex" = NULLIF(regexp_replace("inventoryName", '\D','','g'), '')::numeric;
ALTER TABLE "inventory" DROP COLUMN IF EXISTS "inventoryName";
ALTER TABLE "inventory" ALTER COLUMN "purchaseBagIndex" SET NOT NULL;
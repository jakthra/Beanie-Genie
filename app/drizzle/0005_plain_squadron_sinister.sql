DO $$ BEGIN
 CREATE TYPE "public"."consumableStatusType" AS ENUM('unopened', 'inprogress', 'empty');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."inventoryType" AS ENUM('consumable', 'non-consumable');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"id" serial PRIMARY KEY NOT NULL,
	"inventoryType" "inventoryType" NOT NULL,
	"purchase_id" integer,
	"inventoryName" varchar(256) NOT NULL,
	"statusType" "consumableStatusType" DEFAULT 'unopened' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "numberOfBands" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

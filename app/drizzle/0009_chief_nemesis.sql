CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"supplier" varchar(256) NOT NULL,
	"productName" varchar(256),
	"originRegion" varchar(256),
	"originCountry" varchar(256),
	"createdDate" timestamp DEFAULT now() NOT NULL
);
INSERT INTO "products" SELECT "id", "supplier", "productName", "originRegion", "originCountry", "createdDate" FROM "purchases" 
--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "product_id" integer;--> statement-breakpoint
UPDATE "purchases" SET "product_id" = "id";
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "supplier";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "productName";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "originRegion";--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "originCountry";



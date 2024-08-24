ALTER TABLE "inventory" ADD COLUMN "product_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
 UPDATE "inventory" SET "product_id" = p.product_id from inventory i join purchases p ON p.id  = i.purchase_id where i.id = inventory.id;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

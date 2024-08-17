CREATE TABLE IF NOT EXISTS "inventory_status_changes" (
	"id" serial PRIMARY KEY NOT NULL,
	"inventory_id" integer,
	"createdDate" timestamp DEFAULT now() NOT NULL,
	"statusType" "consumableStatusType" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory_status_changes" ADD CONSTRAINT "inventory_status_changes_inventory_id_inventory_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "public"."inventory"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

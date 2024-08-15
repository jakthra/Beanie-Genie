ALTER TABLE "purchases" RENAME COLUMN "brand" TO "supplier";--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "supplier" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "originRegion" varchar(256);--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "originCountry" varchar(256);
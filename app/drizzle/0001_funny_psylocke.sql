ALTER TABLE "purchases" ADD COLUMN "createdDate" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "entryDate";
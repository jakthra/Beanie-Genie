ALTER TABLE "inventory_status_changes" RENAME COLUMN "statusType" TO "statusFrom";--> statement-breakpoint
ALTER TABLE "inventory_status_changes" ADD COLUMN "statusTo" "consumableStatusType" NOT NULL;
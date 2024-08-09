CREATE TABLE IF NOT EXISTS "purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand" varchar(256),
	"numberOfBands" integer,
	"weightPerBag" double precision,
	"cost" double precision,
	"entryDate" date,
	"purchaseDate" date
);

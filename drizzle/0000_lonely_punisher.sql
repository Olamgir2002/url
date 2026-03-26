CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_url" varchar(12) NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_short_url_unique" UNIQUE("short_url")
);

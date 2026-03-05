import { Meal } from "@/components/Meals/MealsGrid";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "meals.db");
const db = sql(dbPath);

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Failed to load meals");
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export function getMealBySlug(slug: string) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
export async function saveMeal(meal: {
  slug: string;
  title: string;
  summary: string;
  instructions: string;
  image: File;
  creator: string;
  creator_email: string;
}) {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop() || "jpg";
  const fileName = `${slug}.${extension}`;
  const dir = "public/images";
  const filePath = `${dir}/${fileName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const bufferImage = await meal.image.arrayBuffer();
  await new Promise<void>((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);
    stream.write(Buffer.from(bufferImage), (error) => {
      if (error) {
        stream.close();
        reject(new Error("Failed to save image"));
      } else {
        stream.end(() => {
          resolve();
        });
      }
    });
  });

  db.prepare(
    "INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (@slug, @title, @summary, @instructions, @image, @creator, @creator_email)",
  ).run({
    slug,
    title: meal.title,
    summary: meal.summary,
    instructions,
    image: `/images/${fileName}`,
    creator: meal.creator,
    creator_email: meal.creator_email,
  });
}

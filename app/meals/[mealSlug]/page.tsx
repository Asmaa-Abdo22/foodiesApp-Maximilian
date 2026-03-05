import { getMealBySlug } from "@/lib/meals";
import Image from "next/image";
import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";
import { notFound } from "next/navigation";

export async function generateMetadata({params}:{params:Promise<{mealSlug:string}>}) {
  const { mealSlug } = await params;
  const meal = getMealBySlug(mealSlug);
  return{
    title: meal ? meal.title : "Meal Not Found",
    description: meal ? meal.summary : "The meal you are looking for does not exist.",
  }
}
const MealSlugPage = async ({
  params,
}: {
  params: Promise<{ mealSlug: string }>;
}) => {
  const { mealSlug } = await params;
  const meal = getMealBySlug(mealSlug);
  if (!meal) {
    notFound();
  }
  const imageMap: Record<string, any> = {
    "burger.jpg": burgerImg,
    "curry.jpg": curryImg,
    "dumplings.jpg": dumplingsImg,
    "macncheese.jpg": macncheeseImg,
    "pizza.jpg": pizzaImg,
    "schnitzel.jpg": schnitzelImg,
    "tomato-salad.jpg": tomatoSaladImg,
  };

  const filename =
    typeof meal.image === "string"
      ? meal.image.split("/").pop() || meal.image
      : undefined;

  const imageSrc =
    filename && imageMap[filename] ? imageMap[filename] : meal.image;

  const instructionsHtml = (meal.instructions ?? "").replace(/\n/g, "<br />");

  return (
    <div className="bg-[#1c1410] text-[#ddd6cb] min-h-screen rounded-xl shadow-xl">
      <header className="grid md:grid-cols-2 gap-8 items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-xl">
          <Image
            fill
            src={imageSrc}
            alt={meal.title}
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-[#f9572a] to-[#ff8a05] bg-clip-text text-transparent">
            {meal.title}
          </h1>

          <p className="mb-4 text-[#cfa69b] italic">
            By{" "}
            <a
              href={`mailto:${meal.creator_email}`}
              className="underline hover:text-[#ff9b05] transition-colors"
            >
              {meal.creator}
            </a>
          </p>

          <p className="text-base md:text-lg leading-relaxed">{meal.summary}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: instructionsHtml,
          }}
        />
      </main>
    </div>
  );
};

export default MealSlugPage;

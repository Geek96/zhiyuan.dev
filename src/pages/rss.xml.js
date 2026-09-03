import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../lib/site";

export async function GET(context) {
  const notes = (await getCollection("notes", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description ?? "",
      pubDate: note.data.date,
      link: `/notes/${note.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}

import { Reveal } from "@/components/visual/motion";
import {
  articleAccentMap,
  type Article,
} from "@/content/news";

type ArticleContentProps = {
  article: Article;
};

export default function ArticleContent({
  article,
}: ArticleContentProps) {
  const accent = articleAccentMap[article.accent];

  return (
    <article className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="space-y-14 sm:space-y-16">
          {article.content.map((section, index) => (
            <Reveal
              key={`${section.heading}-${index}`}
              delay={index * 0.06}
            >
              <section>
                <p
                  className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${accent.text}`}
                >
                  <span className={`h-px w-10 ${accent.bg}`} />
                  {section.heading}
                </p>

                <p className="mt-5 text-lg leading-[1.8] text-muted-foreground sm:text-xl">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
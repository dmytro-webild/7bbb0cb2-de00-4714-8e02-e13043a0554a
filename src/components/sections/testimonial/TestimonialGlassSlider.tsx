import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight, Sparkle } from "lucide-react";
import { useKitMotion, usePreloadImages } from "@/components/kit/kitMotion";
import MutedAccentTitle from "@/components/kit/MutedAccentTitle";
import Media from "@/components/kit/Media";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  metric?: string;
  imageSrc: string;
  imageAlt?: string;
};

type TestimonialGlassSliderProps = {
  label?: string;
  title?: string;
  mutedTitle?: string;
  description?: string;
  items?: Testimonial[];
  ariaLabel?: string;
  className?: string;
};

const photo = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`;

const defaultItems: Testimonial[] = [
  { quote: "We used to close the month in a week. Now it takes an afternoon and nobody touches a spreadsheet.", name: "Elena Hart", role: "Founder, Nordly Studio", metric: "-12h / week", imageSrc: photo(1036623) },
  { quote: "Late invoices were our biggest worry. The reminders go out on their own and clients actually pay.", name: "Rafael Ortiz", role: "Owner, Kestrel Cloud", metric: "2x faster paid", imageSrc: photo(6605421) },
  { quote: "I finally see earnings, spending and tax in one place before I make a call.", name: "Anika Shah", role: "Operations lead, Halo Goods", metric: "1 view", imageSrc: photo(7006690) },
  { quote: "Our accountant gets clean reports every month without asking us for anything.", name: "Daan Visser", role: "Co-founder, Visser & Berg", metric: "0 exports", imageSrc: photo(10960029) },
];

const TestimonialGlassSlider = ({
  label = "Customers",
  title = "Teams that stopped chasing numbers.",
  mutedTitle = "stopped chasing numbers.",
  description = "Small teams run their money on Veyra. Here is what changed once the numbers kept themselves up to date.",
  items = defaultItems,
  ariaLabel,
  className = "",
}: TestimonialGlassSliderProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "150%");
  const [edges, setEdges] = useState({ prev: false, next: false });

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setEdges({ prev: api.canScrollPrev(), next: api.canScrollNext() });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title ?? "Testimonials"} className={`relative py-[var(--section-space)] text-foreground ${className}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-12">
          <div className="min-w-0">
            {label && (
              <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground/85">
                <Sparkle size={12} fill="currentColor" aria-hidden="true" />
                <p className="whitespace-nowrap text-[length:var(--text-small)]">{label}</p>
              </motion.div>
            )}
            {title && <MutedAccentTitle as="h2" text={title} muted={mutedTitle} className="mt-5 max-w-[18ch] text-[length:var(--text-h1)]" />}
          </div>
          <div className="min-w-0">
            {description && (
              <motion.p {...rise(0.12)} className="text-balance text-[length:var(--text-body-lg)] leading-[1.55] text-muted-foreground">
                {description}
              </motion.p>
            )}
            {items.length > 1 && (
              <motion.div {...rise(0.18)} className="mt-6 flex gap-2 lg:justify-end">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  disabled={!edges.prev}
                  onClick={() => emblaApi?.scrollPrev()}
                  className="grid size-11 place-items-center rounded-lg border border-border bg-card text-foreground transition-[opacity,background-color] duration-300 hover:bg-secondary disabled:pointer-events-none disabled:opacity-35"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  disabled={!edges.next}
                  onClick={() => emblaApi?.scrollNext()}
                  className="grid size-11 place-items-center rounded-lg border border-border bg-card text-foreground transition-[opacity,background-color] duration-300 hover:bg-secondary disabled:pointer-events-none disabled:opacity-35"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <div ref={emblaRef} className="mt-[clamp(2rem,4vw,3.5rem)] cursor-grab overflow-hidden active:cursor-grabbing">
          <div className="flex touch-pan-y gap-[var(--gap)]">
            {items.map((item, i) => (
              <motion.article
                key={i}
                initial={reduce ? false : "hide"}
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="kit-card flex min-w-0 shrink-0 grow-0 basis-[88%] flex-col p-6 lg:basis-[60%] xl:basis-[40%]"
              >
                <div className="overflow-hidden pb-[0.1em]">
                  <motion.h3
                    variants={{ hide: { y: "40%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
                    transition={{ duration: kit.base, ease: kit.ease, delay: Math.min(i, 2) * 0.08 }}
                    className="text-balance text-[length:var(--text-h3)] font-normal leading-snug tracking-[-0.02em] [overflow-wrap:anywhere]"
                  >
                    {item.quote}
                  </motion.h3>
                </div>
                <div className="mt-auto pt-10">
                  <motion.div
                    variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }}
                    transition={{ duration: kit.base, ease: kit.ease, delay: 0.15 + Math.min(i, 2) * 0.08 }}
                    className="h-px origin-left bg-border"
                  />
                  <div className="mt-5 flex items-center gap-3">
                    <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" draggable={false} className="size-12 shrink-0 rounded-lg object-cover saturate-[0.9]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[length:var(--text-body)] font-medium leading-[1.3]">{item.name}</p>
                      {item.role && <p className="truncate text-[length:var(--text-small)] leading-[1.4] text-muted-foreground">{item.role}</p>}
                    </div>
                    {item.metric && (
                      <motion.p
                        variants={{ hide: { scale: 0.8, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                        transition={{ duration: kit.fast, ease: kit.ease, delay: 0.35 + Math.min(i, 2) * 0.08 }}
                        className="shrink-0 whitespace-nowrap rounded-full border border-border bg-secondary px-2.5 py-1 text-[length:var(--text-label)] tabular-nums text-foreground"
                      >
                        {item.metric}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialGlassSlider;

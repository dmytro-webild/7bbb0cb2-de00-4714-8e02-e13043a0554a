import { motion, useReducedMotion } from "motion/react";
import { Sparkle, Users } from "lucide-react";
import { useKitMotion } from "@/components/kit/kitMotion";
import MutedAccentTitle from "@/components/kit/MutedAccentTitle";

type AboutLocalStudentsProps = {
  label?: string;
  title?: string;
  mutedTitle?: string;
  description?: string;
  ariaLabel?: string;
  className?: string;
};

export default function AboutLocalStudents({
  label = "About Us",
  title = "Local students building for local shops.",
  mutedTitle = "building for local shops.",
  description = "Tapline is run by Kian Soltani and Corey Chiang, two students at Saratoga High School. We build websites for local shops in Saratoga, Los Gatos and Campbell, and we meet every owner in person.",
  ariaLabel = "About Tapline",
  className = "",
}: AboutLocalStudentsProps) {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  return (
    <section aria-label={ariaLabel} className={`relative py-[var(--section-space)] text-foreground ${className}`}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-12">
          <div className="min-w-0">
            {label && (
              <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground/85">
                <Sparkle size={12} fill="currentColor" aria-hidden="true" />
                <p className="whitespace-nowrap text-[length:var(--text-small)]">{label}</p>
              </motion.div>
            )}
            <MutedAccentTitle as="h2" text={title} muted={mutedTitle} className="mt-5 max-w-[20ch] text-[length:var(--text-h1)]" />
          </div>

          <motion.div {...rise(0.12)} className="kit-card p-6 md:p-8 flex flex-col gap-4">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-foreground/[0.08] text-foreground">
              <Users size={20} aria-hidden="true" />
            </div>
            <p className="text-[length:var(--text-body-lg)] leading-[1.6] text-foreground/90 font-medium">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

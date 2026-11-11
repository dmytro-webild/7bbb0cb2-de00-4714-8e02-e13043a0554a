import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus, Sparkle } from "lucide-react";
import { useKitMotion } from "@/components/kit/kitMotion";
import MutedAccentTitle from "@/components/kit/MutedAccentTitle";
import FluidPanel from "@/components/kit/FluidPanel";

type FaqItem = { question: string; answer: string };

type ContactCard = { title?: string; description?: string; button?: { text: string; href: string }; imageSrc?: string; imageAlt?: string };

type FaqStickyAccordionProps = {
  label?: string;
  title?: string;
  mutedTitle?: string;
  description?: string;
  items?: FaqItem[];
  contactCard?: ContactCard | null;
  ariaLabel?: string;
  className?: string;
};

const defaultItems: FaqItem[] = [
  { question: "How long does setup take?", answer: "Most teams connect their bank and payment accounts in under ten minutes. Veyra imports the last twelve months so your reports are ready on day one." },
  { question: "Which banks and tools do you support?", answer: "Over 2,000 banks through open banking, plus Stripe, PayPal, Wise, QuickBooks, Xero and Google Sheets. New connections ship every month." },
  { question: "Is my financial data safe?", answer: "Data is encrypted in transit and at rest, stored in the EU, and access is read-only. We never move money without your approval." },
  { question: "Can my accountant use Veyra too?", answer: "Yes. Invite them as a guest at no extra cost. They get clean monthly reports and can export everything they need." },
  { question: "What does the AI assistant do?", answer: "It drafts invoice reminders, flags unusual spending and writes a short summary of each month. Nothing is sent until you approve it." },
  { question: "Can I cancel at any time?", answer: "Plans are monthly and you can cancel in one click. Your data stays available to export for 90 days." },
];

const defaultContact: ContactCard = {
  title: "Still have questions?",
  description: "Our team answers within one working day.",
  button: { text: "Talk to us", href: "#" },
};

const FaqStickyAccordion = ({
  label = "FAQ",
  title = "Questions, answered before you ask.",
  mutedTitle = "answered before you ask.",
  description = "Everything teams ask us before they switch their finance to Veyra.",
  items = defaultItems,
  contactCard = defaultContact,
  ariaLabel,
  className = "",
}: FaqStickyAccordionProps) => {
  const reduce = useReducedMotion() ?? false;
  const kit = useKitMotion();
  const [open, setOpen] = useState(0);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: kit.base, ease: kit.ease, delay },
  });

  return (
    <section aria-label={ariaLabel ?? title ?? "FAQ"} className={`relative py-[var(--section-space)] text-foreground ${className}`}>
      <div className="mx-auto grid w-[var(--container)] gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
        <div className="min-w-0 lg:sticky lg:top-28">
          {label && (
            <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground/85">
              <Sparkle size={12} fill="currentColor" aria-hidden="true" />
              <p className="whitespace-nowrap text-[length:var(--text-small)]">{label}</p>
            </motion.div>
          )}
          {title && <MutedAccentTitle as="h2" text={title} muted={mutedTitle} className="mt-5 max-w-[18ch] text-[length:var(--text-h1)]" />}
          {description && (
            <motion.p {...rise(0.12)} className="mt-6 max-w-[28rem] text-balance text-[length:var(--text-body-lg)] leading-[1.55] text-muted-foreground">
              {description}
            </motion.p>
          )}
          {contactCard && (
            <motion.div
              initial={reduce ? false : "hide"}
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="mt-8 hidden lg:block"
            >
              <motion.div
                variants={{ hide: { clipPath: "inset(48% 0% 48% 0% round 14px)" }, show: { clipPath: "inset(0% 0% 0% 0% round 14px)" } }}
                transition={{ duration: 0.9, ease: kit.ease }}
              >
                <FluidPanel seed={110} imageSrc={contactCard.imageSrc} imageAlt={contactCard.imageAlt} className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-image)] p-4">
                  <motion.div
                    variants={{ hide: { opacity: 0, y: 24, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                    transition={{ duration: kit.base, ease: kit.ease, delay: 0.5 }}
                    className="w-full max-w-[20rem] rounded-[var(--radius)] border border-white/15 bg-black/30 p-4 text-white backdrop-blur-md"
                  >
                    {contactCard.title && <h3 className="text-[length:var(--text-h3)] font-medium tracking-[-0.02em]">{contactCard.title}</h3>}
                    {contactCard.description && <p className="mt-2 text-balance text-[length:var(--text-small)] leading-[1.5] text-white/75">{contactCard.description}</p>}
                    {contactCard.button && (
                      <a href={contactCard.button.href} className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 text-[length:var(--text-small)] font-medium text-black transition-opacity duration-300 hover:opacity-90">
                        {contactCard.button.text}
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </motion.div>
                </FluidPanel>
              </motion.div>
            </motion.div>
          )}
        </div>

        <motion.ul
          initial={reduce ? false : "hide"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="kit-card min-w-0 px-5 py-2 lg:px-6"
        >
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="relative">
                {i > 0 && (
                  <motion.div
                    aria-hidden="true"
                    variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }}
                    transition={{ duration: 0.8, ease: kit.ease, delay: i * 0.05 }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-border"
                  />
                )}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start gap-4 py-5 text-left"
                >
                  <p aria-hidden="true" className="w-6 shrink-0 pt-[0.15em] text-[length:var(--text-small)] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <p className="min-w-0 flex-1 text-balance text-[length:var(--text-body-lg)] font-medium leading-[1.4] [overflow-wrap:anywhere]">{item.question}</p>
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: kit.fast, ease: kit.ease }}
                    className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-foreground"
                  >
                    <Plus size={14} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: kit.fast + 0.1, ease: kit.ease }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={reduce ? false : { y: 12 }}
                        animate={{ y: 0 }}
                        transition={{ duration: kit.base, ease: kit.ease }}
                        className="pb-6 pl-10 pr-11 text-balance text-[length:var(--text-body)] leading-[1.55] text-muted-foreground"
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default FaqStickyAccordion;

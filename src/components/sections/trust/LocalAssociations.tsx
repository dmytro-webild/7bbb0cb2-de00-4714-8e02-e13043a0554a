import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkle,
  ArrowRight,
  PhoneCall,
  Check,
} from "lucide-react";
import MutedAccentTitle from "@/components/kit/MutedAccentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";

export type AssociationItem = {
  id: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  badge: string;
  description: string;
  verified: boolean;
  memberSince?: string;
  features: string[];
  logoSvg: "losgatos" | "saratoga" | "campbell" | "westvalley" | "bbb" | "sbdc";
};

type LocalAssociationsProps = {
  label?: string;
  title?: string;
  mutedTitle?: string;
  description?: string;
  button?: { text: string; href: string };
  items?: AssociationItem[];
  className?: string;
};

const DEFAULT_ITEMS: AssociationItem[] = [
  {
    id: "lg-chamber",
    name: "Los Gatos Chamber of Commerce",
    shortName: "Los Gatos Chamber",
    type: "Local Business Association",
    location: "Los Gatos, CA",
    badge: "Verified Member",
    description: "Active member supporting downtown merchants, retail, dining, and professional service growth across Los Gatos.",
    verified: true,
    memberSince: "Member #LG-4820",
    features: ["Downtown Retail & Service Network", "Local Merchant Committee", "Verified Community Standing"],
    logoSvg: "losgatos",
  },
  {
    id: "saratoga-alliance",
    name: "Saratoga Business Alliance",
    shortName: "Saratoga Alliance",
    type: "Commercial Merchant Network",
    location: "Saratoga, CA",
    badge: "Charter Partner",
    description: "Partnered with Saratoga Village local businesses to strengthen digital search visibility for Saratoga shops.",
    verified: true,
    memberSince: "Village Partner",
    features: ["Saratoga Village Business Network", "Google Maps Visibility Initiative", "Community Directory Listed"],
    logoSvg: "saratoga",
  },
  {
    id: "campbell-chamber",
    name: "Campbell Chamber of Commerce",
    shortName: "Campbell Chamber",
    type: "Commerce & Trade League",
    location: "Campbell, CA",
    badge: "Official Partner",
    description: "Recognized service partner supporting Campbell independent shops, tailors, auto specialists, and salons.",
    verified: true,
    memberSince: "Member #CAM-2910",
    features: ["Orchard City Business Network", "Local Vendor Verification", "Small Business Support League"],
    logoSvg: "campbell",
  },
  {
    id: "wvba-network",
    name: "West Valley Business Association",
    shortName: "West Valley Alliance",
    type: "Regional Business Alliance",
    location: "Saratoga · Los Gatos · Campbell",
    badge: "Verified Local Business",
    description: "Regional business network dedicated to driving direct phone calls and local walk-ins to West Valley owners.",
    verified: true,
    memberSince: "WVBA Seal #9042",
    features: ["West Valley Corridor Seal", "Multi-City Business Directory", "Santa Clara County Network"],
    logoSvg: "westvalley",
  },
  {
    id: "bbb-accredited",
    name: "BBB Accredited Local Business",
    shortName: "BBB Accredited",
    type: "Verified Certification",
    location: "Silicon Valley Region",
    badge: "A+ Rating Accredited",
    description: "Accredited with highest ratings for transparent pricing, rapid mockup delivery, and local client trust.",
    verified: true,
    memberSince: "A+ Rating Verified",
    features: ["A+ Trust Standard Seal", "Verified Local Service Pledge", "Transparent Upfront Pricing"],
    logoSvg: "bbb",
  },
  {
    id: "sbdc-partner",
    name: "Silicon Valley Small Business Network",
    shortName: "Silicon Valley SBDC",
    type: "Service Partner Certification",
    location: "Santa Clara County",
    badge: "Certified Provider",
    description: "Certified local web design partner helping small shops build authoritative online Google presence.",
    verified: true,
    memberSince: "Certified Provider",
    features: ["SBDC Digital Transformation", "100% In-Person Service", "Local Merchant Certification"],
    logoSvg: "sbdc",
  },
];

function LogoIcon({ kind }: { kind: AssociationItem["logoSvg"] }) {
  switch (kind) {
    case "losgatos":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M24 10L35 18V36C35 37.1 34.1 38 33 38H15C13.9 38 13 37.1 13 36V18L24 10Z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 38V26H28V38" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="19" r="3" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
        </svg>
      );
    case "saratoga":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M24 10C17.3726 10 12 15.3726 12 22C12 29.5 24 38 24 38C24 38 36 29.5 36 22C36 15.3726 30.6274 10 24 10Z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="21" r="4" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
        </svg>
      );
    case "campbell":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M24 11V37M11 24H37" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="11" className="fill-primary/15 stroke-primary" strokeWidth="2" />
          <circle cx="24" cy="24" r="4" className="fill-primary" />
        </svg>
      );
    case "westvalley":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M12 16L20 34L28 16L36 34" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="14" r="2.5" className="fill-primary" />
        </svg>
      );
    case "bbb":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M24 10L35 15V23C35 30.5 30.2 36.8 24 39C17.8 36.8 13 30.5 13 23V15L24 10Z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 24L22.5 27.5L29 20" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sbdc":
      return (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" className="fill-primary/10 stroke-primary/30" strokeWidth="1" />
          <path d="M24 11L28.12 19.35L37.33 20.69L30.66 27.19L32.24 36.36L24 32.03L15.76 36.36L17.34 27.19L10.67 20.69L19.88 19.35L24 11Z" className="stroke-primary fill-primary/20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Award className="w-10 h-10 text-primary" />;
  }
}

export default function LocalAssociations({
  label = "West Valley Community Standing",
  title = "Recognized by local chambers & verified business networks.",
  mutedTitle = "verified business networks.",
  description = "Tapline is an active member and verified service provider across Saratoga, Los Gatos, Campbell, and Silicon Valley business organizations.",
  button = { text: "Get free mockup", href: "#contact" },
  items = DEFAULT_ITEMS,
  className = "",
}: LocalAssociationsProps) {
  const reduce = useReducedMotion();
  const { ease, base } = useKitMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: base, ease, delay },
  });

  return (
    <section aria-label={label || title} className={`py-[var(--section-space)] text-foreground ${className}`}>
      <div className="mx-auto w-[var(--container)]">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-12">
          <div className="min-w-0">
            {label && (
              <motion.div
                {...rise(0)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-[length:var(--text-small)] text-foreground/85"
              >
                <ShieldCheck size={14} className="text-primary" aria-hidden="true" />
                <p className="font-medium">{label}</p>
              </motion.div>
            )}
            <MutedAccentTitle
              text={title}
              muted={mutedTitle}
              as="h2"
              className="mt-5 max-w-[20ch] text-[length:var(--text-h1)]"
            />
          </div>
          {(description || button) && (
            <div className="min-w-0">
              {description && (
                <motion.p
                  {...rise(0.12)}
                  className="text-balance text-[length:var(--text-body-lg)] leading-[1.55] text-muted-foreground"
                >
                  {description}
                </motion.p>
              )}
              {button && (
                <motion.div {...rise(0.18)} className="mt-6 flex items-center gap-3">
                  <a href={button.href} className="btn-primary">
                    {button.text}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                  <a href="tel:4155301293" className="btn-secondary inline-flex items-center gap-2">
                    <PhoneCall size={14} aria-hidden="true" />
                    <span>(415) 530-1293</span>
                  </a>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Association Cards Grid */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-[var(--gap)] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: base, ease, delay: index * 0.08 }}
              className="kit-card flex flex-col justify-between p-6 transition-all duration-300 hover:border-primary/40 group relative overflow-hidden"
            >
              {/* Subtle accent glow background effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

              <div>
                {/* Logo & Header Row */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <LogoIcon kind={item.logoSvg} />
                    <div>
                      <span className="text-[length:var(--text-label)] font-semibold text-primary uppercase tracking-wider block">
                        {item.type}
                      </span>
                      <h3 className="text-[length:var(--text-h3)] font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.shortName}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[length:var(--text-label)] font-medium text-primary">
                    <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.badge}
                  </span>
                </div>

                {/* Location & Name */}
                <div className="mt-4 flex items-center gap-1.5 text-[length:var(--text-small)] text-muted-foreground font-medium">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span>{item.location}</span>
                  {item.memberSince && (
                    <>
                      <span className="text-border">·</span>
                      <span className="text-foreground/80">{item.memberSince}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* Bullet Features */}
                <ul className="mt-4 space-y-2 border-t border-border/40 pt-4">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-[length:var(--text-small)] text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-[length:var(--text-label)] text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-medium text-foreground/80">
                  <Building2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {item.name}
                </span>
                <span className="text-primary font-medium flex items-center gap-1">
                  Verified <Check className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Assurance Bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: base, ease, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-[length:var(--text-body)] text-foreground">100% Local Presence</h4>
                <p className="text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                  Based in Santa Clara County, visiting shops in Saratoga, Los Gatos & Campbell.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-[length:var(--text-body)] text-foreground">Verified Local Standing</h4>
                <p className="text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                  Member in good standing with West Valley chambers & commerce leagues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-[length:var(--text-body)] text-foreground">Direct Local Phone</h4>
                <p className="text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                  Call or text (415) 530-1293 anytime — no call centers or offshore queues.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <Sparkle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-[length:var(--text-body)] text-foreground">Zero Risk Free Mockup</h4>
                <p className="text-[length:var(--text-small)] text-muted-foreground mt-0.5">
                  See your custom homepage built with your real business info before paying anything.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

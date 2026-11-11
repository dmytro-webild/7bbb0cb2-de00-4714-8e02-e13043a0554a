import ModelStage from "@/components/kit/ModelStage";
import ParticleYardStage from "@/components/kit/ParticleYardStage";
import HeroFluidDashboard from "@/components/sections/hero/HeroFluidDashboard";
import ProcessFluidSteps from "@/components/sections/features/ProcessFluidSteps";
import IntegrationsTileGrid from "@/components/sections/features/IntegrationsTileGrid";
import AboutLocalStudents from "@/components/sections/about/AboutLocalStudents";
import PricingFluidPlans from "@/components/sections/pricing/PricingFluidPlans";
import FaqStickyAccordion from "@/components/sections/faq/FaqStickyAccordion";
import ContactFluidForm from "@/components/sections/contact/ContactFluidForm";

export default function HomePage() {
  return (
    <>
      <ModelStage
        src="https://storage.googleapis.com/webild/default/models/card-metal/model.8979a05d7ff6.glb"
        scale={1.9}
        autoRotate={8}
        float={1.2}
      />
      <ParticleYardStage variant="tech" density={0.85} />

      <div
        id="hero"
        data-webild-section="HeroFluidDashboard"
        data-webild-section-id="HeroFluidDashboard-1"
        data-section="hero"
        data-particle="hero"
        data-model='[{"x":0.38,"y":0.04,"rx":22,"ry":-28,"rz":12,"scale":1.25,"opacity":1},{"at":1,"x":0.36,"y":-0.05,"rx":-12,"ry":38,"rz":-8,"scale":1.32,"opacity":1}]'
      >
        <HeroFluidDashboard
          tag="Websites for West Valley Shops · tapline.services"
          title="Fast websites for local businesses."
          mutedTitle="for local businesses."
          description="Convert more local searchers into paying customers with a high-speed, mobile-first website."
          primaryButton={{
            text: "Get free mockup",
            href: "#contact"
          }}
          secondaryButton={{
            text: "See sample sites",
            href: "#integrations"
          }}
          variant="chart"
          dashboard={{
            appName: "tapline.services",
            menuLabel: "Menu",
            navItems: [
              {
                label: "Mockups",
                icon: "overview"
              },
              {
                label: "Live Sites",
                icon: "globe"
              },
              {
                label: "Google Profile",
                icon: "chart"
              },
              {
                label: "Client Leads",
                icon: "users"
              },
              {
                label: "Messages",
                icon: "mail"
              }
            ],
            activeIndex: 0,
            generalLabel: "General",
            generalItems: [
              {
                label: "Settings",
                icon: "settings"
              },
              {
                label: "Help Center",
                icon: "help"
              }
            ],
            pageTitle: "Overview",
            greeting: "Welcome local business",
            subline: "Track your website preview and Google Maps views.",
            stats: [
              {
                label: "Google Searches",
                value: "1,420",
                delta: "+24%",
                points: [
                  10,
                  14,
                  18,
                  22,
                  28,
                  35,
                  42,
                  50
                ]
              },
              {
                label: "Website Taps",
                value: "385",
                delta: "+18%",
                points: [
                  5,
                  8,
                  12,
                  18,
                  20,
                  25,
                  30,
                  38
                ]
              }
            ],
            chart: {
              title: "Weekly Visits",
              legend: [
                "Views",
                "Target"
              ],
              bars: [
                {
                  label: "Mon",
                  value: 180,
                  target: 150
                },
                {
                  label: "Tue",
                  value: 240,
                  target: 200
                },
                {
                  label: "Wed",
                  value: 310,
                  target: 250
                },
                {
                  label: "Thu",
                  value: 290,
                  target: 250
                },
                {
                  label: "Fri",
                  value: 420,
                  target: 300
                },
                {
                  label: "Sat",
                  value: 380,
                  target: 300
                }
              ]
            },
            table: {
              title: "Recent Previews",
              columns: [
                "Business",
                "Status"
              ],
              rows: [
                {
                  title: "Example Bakery",
                  meta: "Mockup Ready",
                  value: "Today"
                },
                {
                  title: "Example Auto Shop",
                  meta: "Live Site",
                  value: "Yesterday"
                },
                {
                  title: "Example Tailor",
                  meta: "In Review",
                  value: "Oct 24"
                }
              ]
            },
            promo: {
              title: "Free Mockup Offer",
              text: "See your site before paying anything.",
              progress: 0.85,
              button: {
                text: "Get My Mockup",
                href: "#contact"
              }
            }
          }}
          introDelay={0.2}
        />
      </div>

      <div
        id="process"
        data-webild-section="ProcessFluidSteps"
        data-webild-section-id="ProcessFluidSteps-1"
        data-section="process"
        data-particle="overview"
        data-model='[{"at":0,"x":-0.38,"y":0.06,"rx":-15,"ry":140,"rz":15,"scale":1.22,"opacity":1},{"at":0.5,"x":-0.34,"y":-0.02,"rx":25,"ry":220,"rz":-10,"scale":1.35,"opacity":1},{"at":1,"x":-0.38,"y":-0.08,"rx":10,"ry":310,"rz":5,"scale":1.22,"opacity":1}]'
      >
        <ProcessFluidSteps
          tag="How it works"
          title="From free mockup to live site in two weeks."
          mutedTitle="in two weeks."
          description="We turn your business hours, price list, and Google reviews into a fast website that turns local searchers into paying clients."
          items={[
            {
              title: "Quick 10-minute chat",
              description: "We stop by your shop or call (415) 530-1293 to learn about your services, hours, and target clients in Los Gatos, Saratoga, or Campbell.",
              ui: {
                kind: "connect",
                variant: "stack",
                sources: [
                  {
                    label: "Chat",
                    icon: "chat"
                  },
                  {
                    label: "Mail",
                    icon: "mail"
                  },
                  {
                    label: "Notes",
                    icon: "file"
                  }
                ]
              }
            },
            {
              title: "Gather shop info",
              description: "We collect your current price list, opening hours, address, and top Google reviews so your site looks real and complete.",
              ui: {
                kind: "connect",
                variant: "hub",
                sources: [
                  {
                    label: "Photos",
                    icon: "folder"
                  },
                  {
                    label: "Details",
                    icon: "file"
                  },
                  {
                    label: "Reviews",
                    icon: "users"
                  }
                ]
              }
            },
            {
              title: "Get free mockup",
              description: "Receive a mobile-first homepage preview built with your actual business name, photos, and hours with no commitment.",
              ui: {
                kind: "approve",
                variant: "checklist",
                title: "Homepage draft",
                badge: "Free",
                primary: "View mockup",
                secondary: "Share"
              }
            },
            {
              title: "Structure core offer",
              description: "We highlight your main service offerings and direct phone call triggers right at the top for local mobile searchers.",
              ui: {
                kind: "ranked",
                variant: "list",
                title: "Shop priority",
                badge: "Mobile",
                rows: [
                  {
                    label: "Call button",
                    value: 0.95
                  },
                  {
                    label: "Price list",
                    value: 0.85
                  },
                  {
                    label: "Store hours",
                    value: 0.75
                  }
                ]
              }
            },
            {
              title: "Review and refine",
              description: "We adjust text, photos, and contact links based on your feedback before anything goes live to searchers.",
              ui: {
                kind: "approve",
                variant: "checklist",
                title: "Final check",
                badge: "Step 5",
                tasks: [
                  "Verify prices",
                  "Test call button",
                  "Check address"
                ],
                primary: "Approve site",
                secondary: "Edit"
              }
            },
            {
              title: "Launch on Google",
              description: "We connect your custom domain and link your new website directly to your Google Business Profile.",
              ui: {
                kind: "ranked",
                variant: "list",
                title: "Launch status",
                badge: "Live",
                rows: [
                  {
                    label: "Domain link",
                    value: 0.95
                  },
                  {
                    label: "Google Maps",
                    value: 0.9
                  },
                  {
                    label: "Mobile speed",
                    value: 0.85
                  }
                ]
              }
            }
          ]}
        />
      </div>

      <div
        id="integrations"
        data-webild-section="IntegrationsTileGrid"
        data-webild-section-id="IntegrationsTileGrid-1"
        data-section="integrations"
        data-particle="scan"
        data-model='[{"at":0,"x":0.38,"y":-0.06,"rx":28,"ry":-65,"rz":-15,"scale":1.15,"opacity":1},{"at":1,"x":0.35,"y":0.05,"rx":-25,"ry":35,"rz":12,"scale":1.25,"opacity":1}]'
      >
        <IntegrationsTileGrid
          label="Sample sites"
          title="Built to fit your local business."
          mutedTitle="Not a template."
          description="Every business gets custom colors, hours, prices, and one-tap calling. Here are sample styles built for local shops in Los Gatos, Saratoga, and Campbell."
          button={{
            text: "Get a free mockup",
            href: "#contact"
          }}
          items={[
            {
              name: "Auto repair",
              category: "Automotive",
              icon: "Car"
            },
            {
              name: "Nail studio",
              category: "Beauty & Spa",
              icon: "Sparkles"
            },
            {
              name: "Barbershop",
              category: "Personal Care",
              icon: "Scissors"
            },
            {
              name: "Local bakery",
              category: "Food & Drink",
              icon: "Utensils"
            },
            {
              name: "Tailor shop",
              category: "Apparel Care",
              icon: "ShoppingBag"
            },
            {
              name: "Corner cafe",
              category: "Food & Drink",
              icon: "Coffee"
            },
            {
              name: "House cleaning",
              category: "Home Services",
              icon: "Home"
            },
            {
              name: "Pet grooming",
              category: "Pet Care",
              icon: "Heart"
            },
            {
              name: "Electrician",
              category: "Local Trades",
              icon: "Zap"
            },
            {
              name: "Plumbing shop",
              category: "Local Trades",
              icon: "Wrench"
            },
            {
              name: "Dental care",
              category: "Healthcare",
              icon: "Building"
            },
            {
              name: "Landscaping",
              category: "Outdoor Care",
              icon: "Leaf"
            }
          ]}
        />
      </div>

      <div
        id="about"
        data-webild-section="AboutLocalStudents"
        data-webild-section-id="AboutLocalStudents-1"
        data-section="about"
        data-particle="ambient"
        data-model='[{"at":0,"x":-0.35,"y":0.02,"rx":-18,"ry":75,"rz":8,"scale":1.2,"opacity":1},{"at":1,"x":-0.38,"y":-0.04,"rx":22,"ry":-45,"rz":-12,"scale":1.3,"opacity":1}]'
      >
        <AboutLocalStudents />
      </div>

      <div
        id="pricing"
        data-webild-section="PricingFluidPlans"
        data-webild-section-id="PricingFluidPlans-1"
        data-section="pricing"
        data-particle="hero"
        data-model='[{"at":0,"x":0.38,"y":0.12,"rx":55,"ry":-20,"rz":25,"scale":1.35,"opacity":1},{"at":0.5,"x":0,"y":-0.12,"rx":70,"ry":0,"rz":-15,"scale":1.5,"opacity":1},{"at":1,"x":-0.38,"y":0.08,"rx":-40,"ry":60,"rz":-20,"scale":1.3,"opacity":1}]'
      >
        <PricingFluidPlans
          label="Simple Pricing"
          title="See your design before you pay anything"
          mutedTitle="no hidden fees."
          description="Every project starts with a free homepage mockup. You receive a clear upfront price after seeing your new design."
          items={[
            {
              name: "Free Mockup",
              price: "$0",
              period: "free",
              description: "See your homepage built with your real business info and top reviews.",
              features: [
                "Full homepage visual design",
                "Customized to your local market",
                "Uses real reviews & hours",
                "Mobile optimized layout",
                "No credit card required"
              ],
              button: {
                text: "Get free mockup",
                href: "#contact"
              }
            },
            {
              name: "Full Website",
              price: "$0",
              period: "then $20/mo",
              description: "Founding offer: Free to build for our first 3 shops, then $20/month for hosting, your domain and updates. Cancel anytime.",
              features: [
                "Free website build (first 3 shops)",
                "$20/month hosting & custom domain",
                "Google Maps profile link",
                "Text us for quick updates",
                "Cancel anytime with no fee"
              ],
              button: {
                text: "Get free mockup",
                href: "#contact"
              }
            },
            {
              name: "Review Card",
              price: "$39",
              period: "one-time",
              description: "Custom tap card for your counter so customers leave Google reviews fast.",
              features: [
                "Custom printed logo card",
                "Instant tap to review",
                "Works with all smartphones",
                "Zero ongoing monthly fees"
              ],
              button: {
                text: "Order review card",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div
        id="faq"
        data-webild-section="FaqStickyAccordion"
        data-webild-section-id="FaqStickyAccordion-1"
        data-section="faq"
        data-particle="overview"
        data-model='[{"at":0,"x":-0.38,"y":0.04,"rx":15,"ry":-115,"rz":6,"scale":1.15,"opacity":0.95},{"at":1,"x":-0.35,"y":-0.06,"rx":-20,"ry":25,"rz":-8,"scale":1.2,"opacity":0.95}]'
      >
        <FaqStickyAccordion
          label="FAQ"
          title="Before you request a mockup"
          mutedTitle="request a mockup"
          description="Clear answers about timelines, updates, and setup for Saratoga, Los Gatos, and Campbell local businesses."
          items={[
            {
              question: "What is the free mockup?",
              answer: "We create a full homepage design with your real shop name, hours, and photos. It is yours to keep with no obligation."
            },
            {
              question: "How long does setup take?",
              answer: "Once you approve the mockup, your site is fully built and live in about two weeks."
            },
            {
              question: "How do text updates work?",
              answer: "Send a text whenever your prices, hours, or services change. We update the site for you."
            },
            {
              question: "Can I keep my current booking software?",
              answer: "Yes. We link your existing Square, Fresha, or custom booking tool right into the main action button."
            },
            {
              question: "Do I need to sign a long contract?",
              answer: "No long-term contracts. You see your design first before paying anything, and pricing is clear upfront."
            }
          ]}
          contactCard={{
            title: "Have more questions?",
            description: "Call (415) 530-1293 or send a message to discuss your shop site with tapline.services.",
            button: {
              text: "Get free mockup",
              href: "#contact"
            }
          }}
        />
      </div>

      <div
        id="contact"
        data-webild-section="ContactFluidForm"
        data-webild-section-id="ContactFluidForm-1"
        data-section="contact"
        data-particle="close"
        data-model='[{"at":0,"x":0.35,"y":-0.02,"rx":-15,"ry":35,"rz":-10,"scale":1.3,"opacity":1},{"at":1,"x":0.38,"y":0.08,"rx":25,"ry":-65,"rz":15,"scale":1.4,"opacity":1}]'
      >
        <ContactFluidForm
          tag="Get started"
          title="Get your free homepage mockup."
          mutedTitle="homepage mockup."
          nameLabel="Your name"
          emailLabel="Email address"
          companyLabel="Business name"
          messageLabel="Business details"
          submitText="Get my mockup"
          variant="calendar"
          avatars={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/confident-man-standing-with-crossed-hands_1187-5803.jpg",
              imageAlt: "Confident man standing with crossed hands.",
              initials: "DC"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/beautiful-woman-using-digital-tablet_1170-409.jpg",
              imageAlt: "Beautiful woman using digital tablet",
              initials: "SM"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/african-american-confidential-man-asking-silence-secrecy_482257-122318.jpg",
              imageAlt: "African american confidential man asking for silence and secrecy",
              initials: "MV"
            }
          ]}
          note="Free mockup in two days · Call or text (415) 530-1293"
        />
      </div>
    </>
  );
}

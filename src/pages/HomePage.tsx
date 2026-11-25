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
        data-model='[{"at":0,"x":0.38,"y":0.08,"rx":25,"ry":-45,"rz":15,"scale":1.25,"opacity":0.95},{"at":1,"x":0.35,"y":-0.04,"rx":-20,"ry":65,"rz":-10,"scale":1.3,"opacity":1}]'
      >
        <HeroFluidDashboard
          tag="Google NFC Review Cards · tapline.services"
          title="Make it easier to get Google reviews with custom NFC cards."
          mutedTitle="with custom NFC cards."
          description="Place custom-printed Google NFC cards on your counter. Customers tap their phone to instantly open your Google review page. Plus, pair with a custom local website."
          primaryButton={{
            text: "Order Google NFC Card",
            href: "#pricing"
          }}
          secondaryButton={{
            text: "Explore Websites",
            href: "#integrations"
          }}
          variant="chart"
          dashboard={{
            appName: "Tapline NFC Cards",
            menuLabel: "Menu",
            navItems: [
              {
                label: "NFC Cards",
                icon: "overview"
              },
              {
                label: "Google Reviews",
                icon: "chart"
              },
              {
                label: "Card Taps",
                icon: "globe"
              },
              {
                label: "Website Previews",
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
            subline: "Track your NFC card taps and Google review growth.",
            stats: [
              {
                label: "Google NFC Taps",
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
                label: "Google Reviews",
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
              title: "Weekly Card Taps",
              legend: [
                "Taps",
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
              title: "Recent Card Orders",
              columns: [
                "Business",
                "Status"
              ],
              rows: [
                {
                  title: "Example Bakery",
                  meta: "Custom NFC Card",
                  value: "Delivered"
                },
                {
                  title: "Example Auto Shop",
                  meta: "NFC Card + Website",
                  value: "Active"
                },
                {
                  title: "Example Tailor",
                  meta: "Review Card",
                  value: "Processing"
                }
              ]
            },
            promo: {
              title: "Google NFC Review Card",
              text: "Make it simple for counter customers to leave Google reviews.",
              progress: 0.9,
              button: {
                text: "Order Card",
                href: "#pricing"
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
          tag="How NFC cards work"
          title="From instant counter tap to customer review."
          mutedTitle="to customer review."
          description="We encode your shop's Google review link onto custom NFC cards for your counter, with the option to pair with a matching high-speed website."
          items={[
            {
              title: "Quick 10-minute order",
              description: "Provide your shop's Google Business Profile review link and logo for Saratoga, Los Gatos, or Campbell shops.",
              ui: {
                kind: "connect",
                variant: "stack",
                sources: [
                  {
                    label: "Google Link",
                    icon: "chat"
                  },
                  {
                    label: "Shop Logo",
                    icon: "mail"
                  },
                  {
                    label: "Address",
                    icon: "file"
                  }
                ]
              }
            },
            {
              title: "Custom NFC card setup",
              description: "We program your Google review URL onto a high-durability NFC card with custom shop branding and QR fallback.",
              ui: {
                kind: "connect",
                variant: "hub",
                sources: [
                  {
                    label: "NFC Chip",
                    icon: "folder"
                  },
                  {
                    label: "Print Logo",
                    icon: "file"
                  },
                  {
                    label: "QR Code",
                    icon: "users"
                  }
                ]
              }
            },
            {
              title: "Place card on counter",
              description: "Set your branded card at your checkout register, front desk, or dining table so customers see it right away.",
              ui: {
                kind: "approve",
                variant: "checklist",
                title: "Card setup",
                badge: "Ready",
                primary: "Place on counter",
                secondary: "Details"
              }
            },
            {
              title: "Tap & leave a review",
              description: "Customers tap their iPhone or Android phone against the card, opening your Google review form in seconds.",
              ui: {
                kind: "ranked",
                variant: "list",
                title: "Tap actions",
                badge: "Instant",
                rows: [
                  {
                    label: "Phone tap",
                    value: 0.98
                  },
                  {
                    label: "Auto link open",
                    value: 0.95
                  },
                  {
                    label: "Review submission",
                    value: 0.9
                  }
                ]
              }
            },
            {
              title: "Grow your online presence",
              description: "Watch your customer review count climb every week, helping local searchers find your shop.",
              ui: {
                kind: "approve",
                variant: "checklist",
                title: "Review growth",
                badge: "Visibility",
                tasks: [
                  "More customer reviews",
                  "Better online presence",
                  "More phone calls"
                ],
                primary: "Track growth",
                secondary: "Stats"
              }
            },
            {
              title: "Add optional website",
              description: "Pair your NFC cards with a custom high-speed website so local searchers can browse your hours, prices, and services.",
              ui: {
                kind: "ranked",
                variant: "list",
                title: "Website option",
                badge: "Add-on",
                rows: [
                  {
                    label: "Mobile design",
                    value: 0.95
                  },
                  {
                    label: "Google Maps link",
                    value: 0.9
                  },
                  {
                    label: "Price list",
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
          label="Card Styles & Industries"
          title="Custom Google NFC cards for every shop."
          mutedTitle="for every shop."
          description="Durable, high-touch counter cards customized with your logo. Perfect for local shops across Saratoga, Los Gatos, and Campbell, with optional site design."
          button={{
            text: "Order Google NFC Card",
            href: "#pricing"
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
          title="Get Google NFC cards & local websites"
          mutedTitle="local websites."
          description="Get a counter NFC card for a one-time $15 payment, upgrade to Tapline Pro for analytics and dynamic links, or pair with a custom website."
          items={[
            {
              name: "Google NFC Review Card",
              price: "$15",
              period: "one-time",
              description: "Custom printed tap card for your counter so customers can easily open your review link.",
              features: [
                "Custom printed logo card",
                "Instant tap to review chip",
                "Pre-programmed Google link",
                "QR code fallback included",
                "Card continues to redirect permanently"
              ],
              button: {
                text: "Order review card",
                href: "#contact"
              }
            },
            {
              name: "Tapline Pro",
              price: "$9.99",
              period: "/month",
              description: "Dynamic NFC destinations, multiple cards and locations with link-visit analytics.",
              features: [
                "Editable NFC destinations",
                "Multiple cards & location support",
                "Link-visit analytics (tracked as link opens)",
                "Cash or online billing options",
                "Basic cards continue to redirect after Pro expires"
              ],
              note: "Pro is being tested. Online payments are not live yet.",
              button: {
                text: "Explore Pro",
                href: "https://tapline-pro.vercel.app"
              }
            },
            {
              name: "NFC Card + Website Bundle",
              price: "$15",
              period: "then $20/mo",
              description: "Our top bundle: custom Google NFC card ($15 one-time) paired with a full mobile-first website for local shops.",
              features: [
                "Includes 1 Google NFC Review Card ($15)",
                "Free website build ($0 setup fee)",
                "$20/month hosting & custom domain",
                "Google Maps profile link",
                "Text us for quick updates"
              ],
              button: {
                text: "Get NFC + Website",
                href: "#contact"
              }
            },
            {
              name: "Website Only",
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
          title="Everything about Google NFC cards"
          mutedTitle="about Google NFC cards"
          description="Clear answers about setup, instant taps, monthly fees, and website add-ons for Saratoga, Los Gatos, and Campbell local businesses."
          items={[
            {
              question: "What is a Google NFC card?",
              answer: "It is a compact counter card with an embedded NFC microchip. When customers tap their iPhone or Android phone against it, their phone instantly opens your official Google review page."
            },
            {
              question: "Do customers need an app to tap the card?",
              answer: "No app required! NFC works natively on all modern smartphones. Customers simply tap their phone or scan the printed QR fallback."
            },
            {
              question: "Are there any recurring monthly fees for NFC cards?",
              answer: "No monthly fees for the basic Google NFC card. It is a single one-time payment of $15 with zero subscription fees."
            },
            {
              question: "Do you also build custom local websites?",
              answer: "Yes! While Google NFC review cards are our main product, we also build and host high-speed websites tailored for local shops in Saratoga, Los Gatos, and Campbell."
            },
            {
              question: "How fast will my custom NFC card arrive?",
              answer: "We program your Google review link onto your custom card and hand-deliver or ship it within 2 to 3 days."
            }
          ]}
          contactCard={{
            title: "Ready to get more customer Google reviews?",
            description: "Call (415) 530-1293 or send a message to order your custom Google NFC cards and local website with tapline.services.",
            button: {
              text: "Order NFC Card",
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
          tag="Get Started"
          title="Order your custom Google NFC card."
          mutedTitle="Google NFC card."
          nameLabel="Your name"
          emailLabel="Email address"
          companyLabel="Business name & city"
          messageLabel="Google profile link or request details"
          submitText="Order NFC Card"
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
          note="Delivered in 2-3 days · Call or text (415) 530-1293"
        />
      </div>
    </>
  );
}


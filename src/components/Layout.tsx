import { Outlet } from "react-router-dom";
import NavbarLoginTab from "@/components/navbars/NavbarLoginTab";
import FooterSubscribeWordmark from "@/components/sections/footer/FooterSubscribeWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarLoginTab
          brand="tapline.services"
          navItems={[
            {
              name: "NFC Cards",
              href: "#hero"
            },
            {
              name: "How it works",
              href: "#process"
            },
            {
              name: "Card styles",
              href: "#integrations"
            },
            {
              name: "About",
              href: "#about"
            },
            {
              name: "Pricing",
              href: "#pricing"
            },
            {
              name: "FAQ",
              href: "#faq"
            }
          ]}
          primaryButton={{
            text: "Order NFC Card",
            href: "#pricing"
          }}
          secondaryButton={{
            text: "Call (415) 530-1293",
            href: "tel:4155301293"
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterSubscribeWordmark
          brand="tapline.services"
          description="Custom Google NFC review cards for local shops in Saratoga, Los Gatos, and Campbell. Boost your 5-star Google reviews with instant tap cards, plus custom local web design."
          subscribe={{
            placeholder: "hello@tapline.services",
            button: "Order NFC Card"
          }}
          columns={[
            {
              title: "Navigation",
              links: [
                {
                  text: "Google NFC Cards",
                  href: "#hero"
                },
                {
                  text: "How it works",
                  href: "#process"
                },
                {
                  text: "Card styles",
                  href: "#integrations"
                },
                {
                  text: "About",
                  href: "#about"
                },
                {
                  text: "Pricing",
                  href: "#pricing"
                }
              ]
            },
            {
              title: "Products & Services",
              links: [
                {
                  text: "Google NFC Review Cards",
                  href: "#pricing"
                },
                {
                  text: "NFC + Website Bundle",
                  href: "#pricing"
                },
                {
                  text: "Custom Local Web Design",
                  href: "#contact"
                },
                {
                  text: "Google Maps Integration",
                  href: "#process"
                }
              ]
            },
            {
              title: "Service Areas",
              links: [
                {
                  text: "Saratoga, CA",
                  href: "#contact"
                },
                {
                  text: "Los Gatos, CA",
                  href: "#contact"
                },
                {
                  text: "Campbell, CA",
                  href: "#contact"
                },
                {
                  text: "Get in touch",
                  href: "mailto:hello@tapline.services"
                }
              ]
            },
            {
              title: "Legal",
              links: [
                {
                  text: "Privacy Policy",
                  href: "#"
                },
                {
                  text: "Terms of Service",
                  href: "#"
                },
                {
                  text: "FAQ",
                  href: "#faq"
                }
              ]
            }
          ]}
          socials={[
            {
              text: "X / Twitter",
              href: "#"
            },
            {
              text: "Instagram",
              href: "#"
            },
            {
              text: "LinkedIn",
              href: "#"
            }
          ]}
          copyright="© 2026 tapline.services. All rights reserved."
        />
      </footer>
    </div>
  );
}

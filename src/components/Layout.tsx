import { Outlet } from "react-router-dom";
import NavbarLoginTab from "@/components/navbars/NavbarLoginTab";
import FooterSubscribeWordmark from "@/components/sections/footer/FooterSubscribeWordmark";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarLoginTab
          brand="Tapline"
          navItems={[
            {
              name: "Sample sites",
              href: "#integrations"
            },
            {
              name: "How it works",
              href: "#process"
            },
            {
              name: "Pricing",
              href: "#pricing"
            },
            {
              name: "FAQ",
              href: "#faq"
            },
            {
              name: "Reviews",
              href: "#testimonial"
            }
          ]}
          primaryButton={{
            text: "Get free mockup",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Call (408) 550-8275",
            href: "tel:4085508275"
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterSubscribeWordmark
          brand="Tapline"
          description="Fast, custom websites for local businesses in Saratoga, Los Gatos, and Campbell. Get a free homepage mockup with no commitment."
          subscribe={{
            placeholder: "hello@tapline.com",
            button: "Get Free Mockup"
          }}
          columns={[
            {
              title: "Navigation",
              links: [
                {
                  text: "How it works",
                  href: "#process"
                },
                {
                  text: "Sample designs",
                  href: "#integrations"
                },
                {
                  text: "Pricing",
                  href: "#pricing"
                },
                {
                  text: "Client reviews",
                  href: "#testimonial"
                }
              ]
            },
            {
              title: "Services",
              links: [
                {
                  text: "Free Homepage Mockup",
                  href: "#hero"
                },
                {
                  text: "Local Web Design",
                  href: "#contact"
                },
                {
                  text: "Google Profile Integration",
                  href: "#process"
                },
                {
                  text: "Google NFC Cards",
                  href: "#pricing"
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
                  href: "mailto:hello@tapline.com"
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
          copyright="© 2026 Tapline. All rights reserved."
        />
      </footer>
    </div>
  );
}

import { Github, Linkedin, Heart } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/raahul1912", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rahul-singh-3633a780/", label: "LinkedIn" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-6 border-t border-border gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-smooth mb-2 block"
            >
              Rahul Singh
            </button>
            <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
              © {currentYear} Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by Rahul Singh
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Designed and built with modern technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"
import workspaceImage from "@/assets/workspace.jpg"

const skills = {
  "Frontend": ["React.js", "TypeScript", "JavaScript", "Vite", "Next.js"],
  "Backend": ["Node.js", "Nest", "REST APIs", "Microservices", "GraphQL", "Kafka"],
  "Database": ["MySQL", "MongoDB", "PostgreSQL"],
  "Tools": ["Git", "Docker", "AWS", "Agile", "CI/CD"]
}

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-20 px-6 gradient-subtle ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                About Me
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                I'm a Senior Software Development Engineer with 8+ years of professional experience 
                in developing high-quality software applications. Based in Pune, India, 
                I specialize in building scalable and optimized solutions using modern technologies.
              </p>
              
              <p className="text-muted-foreground">
                My expertise lies in JavaScript and TypeScript ecosystems, with a focus on 
                Node.js, React.js, and database technologies. I'm passionate about writing 
                clean, efficient code and working in agile development environments.
              </p>
            </div>
            
            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary">Skills & Technologies</h3>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="text-lg font-medium text-foreground">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="transition-smooth hover:shadow-glow hover:-translate-y-0.5"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Workspace Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-elegant hover:shadow-glow transition-smooth">
                <img 
                  src={workspaceImage}
                  alt="Modern workspace setup"
                  className="w-full h-auto hover:scale-105 transition-smooth"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-primary/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
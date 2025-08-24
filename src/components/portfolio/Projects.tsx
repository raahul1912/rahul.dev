import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import showcaseImage from "@/assets/showcase.jpg"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern, fully-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: showcaseImage,
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team workspaces, and project analytics.",
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    category: "Frontend",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "API Gateway Service",
    description: "Microservices API gateway with rate limiting, authentication, and service discovery capabilities.",
    technologies: ["Python", "FastAPI", "Docker", "Redis", "JWT"],
    category: "Backend",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication and real-time transaction monitoring.",
    technologies: ["React Native", "TypeScript", "Firebase", "Plaid"],
    category: "Mobile",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "AI Content Generator",
    description: "AI-powered content generation tool with multiple output formats and custom training capabilities.",
    technologies: ["Next.js", "OpenAI", "Prisma", "PostgreSQL"],
    category: "Full-Stack",
    liveUrl: "#",
    githubUrl: "#"
  }
]

const filters = ["All", "Frontend", "Backend", "Full-Stack", "Mobile"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const filteredProjects = projects.filter(project => 
    activeFilter === "All" || project.category === activeFilter
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`py-20 px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring diverse technologies and innovative solutions
          </p>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className="transition-smooth hover:shadow-glow"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`gradient-card border-border hover:shadow-elegant transition-smooth hover:-translate-y-2 ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {project.image && (
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold text-primary">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Badge variant="secondary" className="ml-2">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="transition-smooth hover:shadow-glow">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button variant="outline" size="sm" className="transition-smooth hover:shadow-glow">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
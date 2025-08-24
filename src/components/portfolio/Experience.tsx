import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const experiences = [
  {
    id: 1,
    company: "Bridgenext",
    position: "Senior Software Development Engineer",
    duration: "2021 - Present",
    location: "Pune, India",
    responsibilities: [
      "Part of an agile development team building scalable software solutions",
      "Developing high-quality applications using JavaScript and TypeScript",
      "Working with Node.js, React.js, and database technologies",
      "Focus on building optimized and maintainable code solutions",
      "Contributing to architectural decisions and technical implementations"
    ],
    technologies: ["Node.js", "TypeScript", "React.js", "MySQL", "GraphQL", "Kafka", "NewRelic"]
  },
  {
    id: 2,
    company: "smartSense Solutions",
    position: "Software Development Engineer",
    duration: "2019 - 2021",
    location: "Gandhinagar, India",
    responsibilities: [
      "Developed web applications using modern JavaScript frameworks",
      "Implemented database solutions using MySQL and MongoDB",
      "Collaborated with cross-functional teams in agile environment",
      "Participated in code reviews and technical documentation",
      "Built and maintained REST APIs for various applications"
    ],
    technologies: ["JavaScript", "Node.js", "React.js", "MySQL", "MongoDB", "Express.js"]
  },
  {
    id: 3,
    company: "iLink Infosoft",
    position: "Software Developer",
    duration: "2017 - 2019",
    location: "Ahmedabad, India",
    responsibilities: [
      "Started career in software development with focus on web technologies",
      "Learned and implemented JavaScript and database fundamentals",
      "Contributed to team projects and gained experience in software lifecycle",
      "Worked on bug fixes and feature enhancements",
      "Participated in team meetings and project planning sessions"
    ],
    technologies: ["JavaScript", "Node.js", "Express.js", "Couchbase", "Git"]
  }
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const ref = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards(prev => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref)
    })

    return () => cardObserver.disconnect()
  }, [visibleCards])

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`py-20 px-6 gradient-subtle ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles and the impact I've made along the way
          </p>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => cardRefs.current[index] = el}
              className={`transition-all duration-700 ${
                visibleCards.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <Card className="gradient-card border-border hover:shadow-elegant transition-smooth hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
                        <Building2 className="w-6 h-6" />
                        {experience.position}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground">
                        {experience.company} • {experience.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{experience.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Responsibilities */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-primary">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-primary">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="transition-smooth hover:shadow-glow hover:-translate-y-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
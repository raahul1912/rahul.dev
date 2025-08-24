import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Users } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const achievements = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    type: "Certification",
    icon: Trophy,
    description: "Professional level certification demonstrating expertise in designing distributed systems on AWS."
  },
  {
    id: 2,
    title: "Best Innovation Award",
    issuer: "TechCorp Solutions",
    date: "2023",
    type: "Award",
    icon: Award,
    description: "Recognized for developing an AI-powered optimization system that improved performance by 40%."
  },
  {
    id: 3,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2022",
    type: "Certification",
    icon: Trophy,
    description: "Certified in designing, building, and deploying applications on Google Cloud Platform."
  },
  {
    id: 4,
    title: "Team Leadership Excellence",
    issuer: "StartupXYZ",
    date: "2021",
    type: "Award",
    icon: Users,
    description: "Awarded for outstanding leadership in mentoring junior developers and project delivery."
  },
  {
    id: 5,
    title: "React Advanced Certification",
    issuer: "Meta",
    date: "2021",
    type: "Certification",
    icon: Star,
    description: "Advanced React certification covering hooks, context, performance optimization, and testing."
  }
]

const stats = [
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Certifications Earned", value: 8, suffix: "" },
  { label: "Team Members Mentored", value: 15, suffix: "+" }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          let start = 0
          const end = value
          const duration = 2000
          const increment = end / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, isVisible])

  return (
    <span ref={ref} className="text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  )
}

export function Awards() {
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
      id="awards" 
      ref={ref}
      className={`py-20 px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Awards & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognition for excellence in software development and professional growth
          </p>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center space-y-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            return (
              <div
                key={achievement.id}
                ref={(el) => cardRefs.current[index] = el}
                className={`transition-all duration-700 ${
                  visibleCards.includes(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <Card className="gradient-card border-border hover:shadow-elegant transition-smooth hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-primary">
                            {achievement.title}
                          </CardTitle>
                          <CardDescription className="text-foreground font-medium">
                            {achievement.issuer}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {achievement.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
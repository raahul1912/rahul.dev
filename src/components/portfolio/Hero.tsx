import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import portraitImage from "@/assets/portrait.jpg"

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 gradient-hero relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="text-left space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-primary">
              Rahul Singh
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
              Fullstack Developer
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-foreground max-w-lg leading-relaxed">
            Building scalable & optimized solutions with 8+ years of experience in 
            developing high-quality software applications using modern technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              size="lg"
              className="transition-smooth hover:shadow-glow hover:-translate-y-1"
              onClick={scrollToAbout}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="transition-smooth hover:shadow-glow hover:-translate-y-1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf'; // Path to your file in the public folder
                link.download = 'resume.pdf'; // filename after download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Resume
            </Button>
          </div>
        </div>
        
        {/* Right Column - Portrait */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-elegant hover:shadow-glow transition-smooth">
              <img 
                src={portraitImage}
                alt="Rahul Singh - Professional Portrait"
                className="w-full h-full object-cover hover:scale-105 transition-smooth"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-primary/10 pointer-events-none"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground hover:text-primary transition-smooth" />
      </button>
    </section>
  )
}
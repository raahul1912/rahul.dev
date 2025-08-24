import { Header } from "@/components/portfolio/Header"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Experience } from "@/components/portfolio/Experience"
import { Contact } from "@/components/portfolio/Contact"
import { Footer } from "@/components/portfolio/Footer"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        {/* <Projects /> */}
        <Experience />
        {/* <Awards /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

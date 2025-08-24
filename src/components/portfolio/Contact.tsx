import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/raahul1912",
    label: "GitHub",
    username: "@raahul1912",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rahul-singh-3633a780/",
    label: "LinkedIn",
    username: "/in/rahul-singh-3633a780/",
  },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "rahulsingh1912@outlook.com" },
  { icon: Phone, label: "Phone", value: "+91 8460577830" },
  { icon: MapPin, label: "Location", value: "Pune, India" },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_ib2m4vh", // from your EmailJS dashboard
        "template_su2m70q", // email template id
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "9Hv2qBnYQugkHi8Rn" // public key
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again later.",
      });
    }

    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-20 px-6 gradient-subtle ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to work together? I'd love to hear from you. Let's create
            something amazing.
          </p>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Send a Message
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below and I'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="transition-smooth focus:shadow-glow"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="transition-smooth focus:shadow-glow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-foreground"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="transition-smooth focus:shadow-glow"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    required
                    className="transition-smooth focus:shadow-glow resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full transition-smooth hover:shadow-glow hover:-translate-y-1"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  You can also reach me through these channels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {item.label}
                        </p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">
                  Connect With Me
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Follow my journey and connect on social platforms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth hover:shadow-glow group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {social.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {social.username}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

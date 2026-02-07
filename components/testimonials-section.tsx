"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Home Cook",
    avatar: "/indian-woman-portrait-smiling.jpg",
    content:
      "TalktoTaste has completely changed how I cook! As someone with arthritis, the voice control feature is a blessing. I can finally cook my favorite recipes without struggling with my phone.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    role: "Working Professional",
    avatar: "/indian-man-professional-portrait.png",
    content:
      "The whistle tracking feature is genius! No more burned dal or undercooked rajma. This app understands the Indian kitchen perfectly.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "College Student",
    avatar: "/young-indian-woman-student.jpg",
    content:
      "I was clueless in the kitchen before TalktoTaste. Now I can cook authentic dishes for my roommates and they think I'm a chef! The Hindi voice option is so helpful for my grandmother too.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Loved by <span className="gradient-text">Home Cooks</span>
          </h2>
          <p className="text-lg text-muted-foreground">See what our community says about cooking with TalktoTaste</p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Quote icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 mb-8 leading-relaxed">{`"${testimonial.content}"`}</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ZoomableImage } from './ZoomableImage'

interface StorySection {
    title: string
    content: string
    image: string
}

const storyData: StorySection[] = [
    {
        title: "The Beginning",
        content: "Our journey began with a simple idea: to create something meaningful.",
        image: "/Rplot.png"
    },
    {
        title: "The Beginning",
        content: "Our journey began with a simple idea: to create something meaningful.",
        image: "/Rplot01.png"
    },
    {
        title: "Growth Phase",
        content: "As we progressed, our project gained traction and started to grow exponentially.",
        image: "/Rplot02.png"
    },
    {
        title: "Challenges",
        content: "We faced numerous obstacles, but each one made us stronger and more resilient.",
        image: "/Rplot03.png"
    },
    {
        title: "Innovation",
        content: "Through perseverance and creativity, we developed innovative solutions to complex problems.",
        image: "/Rplot04.png"
    },
    {
        title: "Success",
        content: "Finally, our hard work paid off, and we achieved the success we had been striving for.",
        image: "/Rplot05.png"
    },
    {
        title: "Expansion",
        content: "With our initial success, we began to explore new horizons and expand our reach.",
        image: "/Rplot06.png"
    },
    {
        title: "New Horizons",
        content: "As we look to the future, we're excited for the new adventures and challenges that await.",
        image: "/Rplot07.png"
    }
]

export default function StorytellingComponent() {
    const [activeSection, setActiveSection] = useState(0)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observers = sectionRefs.current.map((ref, index) => {
            if (ref) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveSection(index)
                        }
                    },
                    { threshold: 0.5 }
                )
                observer.observe(ref)
                return observer
            }
            return null
        })

        return () => {
            observers.forEach(observer => observer?.disconnect())
        }
    }, [])

    return (
        <>
            <div className="space-y-8">
                {storyData.map((section, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => { sectionRefs.current[index] = el }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={activeSection === index ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-none border-none bg-base-100">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <p className="flex-1">{section.content}</p>
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="w-full md:w-1/2 h-auto rounded-lg shadow-md cursor-pointer"
                                        onClick={() => setSelectedImage(section.image)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0">
                    {selectedImage && (
                        <ZoomableImage src={selectedImage} alt="Full size image" />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
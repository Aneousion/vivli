'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ZoomableImage } from './ZoomableImage'
import { useTheme } from 'next-themes'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface StorySection {
    title: string
    content: string
    images: string[]
}

const storyData: StorySection[] = [
    {
        title: "Burden of Infection",
        content: "The chart illustrates the global, African and Nigerian burden of infection caused by various resistant bacteria. Klebsiella pneumoniae ranks as the third highest in Africa, following Staphylococcus aureus and Escherichia coli. Its high resistance count underscores its role as a significant threat to global health, with a particularly high infection burden and mortality rate in Africa.",
        images: ["/Rplot.png", "/Rplot01.png", "/Rplot02.png"]
    },
    {
        title: "Distribution of Resistance",
        content: "The chart illustrates the global, African and Nigerian distribution of resistance, intermediate, and susceptible phenotypes for various bacterial species. Klebsiella pneumoniae shows a relatively high percentage of resistance, indicating its significant contribution to the global antimicrobial resistance burden.",
        images: ["/Rplot03.png", "/Rplot04.png", "/Rplot05.png"]
    },
    {
        title: "Frequency of Resistance",
        content: "This chart highlights the frequency of antimicrobial resistance among various organisms in Africa and Nigeria. Klebsiella pneumoniae has the highest resistance count, reinforcing its significance as a critical target in combating antimicrobial resistance (AMR) on the continent.",
        images: ["/Rplot06.png", "/Rplot07.png"]
    },
    {
        title: "Multi-Drug Resistance (MDR) Pattern (Heatmaps)",
        content: "This visualization depicts the MDR pattern of various bacterial species in Africa, showing the percentage of resistance to different antibiotic classes. Notably, Klebsiella pneumoniae and Acinetobacter baumannii exhibit multidrug resistance (MDR) across critical antibiotics, including Carbapenems and Cephalosporins, highlighting serious concerns about treatment options for infections caused by these pathogens.",
        images: ["/mdr_pattern_africa.png"]
    },
    {
        title: "Klebsiella pneumoniae Resistance Trend (Time-Series)",
        content: "Based on the ATLAS dataset, Cephalosporins and Fluoroquinolones have consistently high resistance from K. pneumoniae, with a peak around 2008 and a gradual decline, though resistance remains significant. Carbapenems show relatively lower resistance but a slight upward trend after 2016, indicating growing resistance to these last-line treatments. Sulfonamides exhibit the highest resistance across all years, staying above 50% throughout the timeline. Aminoglycosides display a sharp increase in resistance after 2016, indicating an alarming rise. These trends indicate that Klebsiella pneumoniae is developing increased resistance to multiple antibiotic classes over time, particularly to critical treatments like Carbapenems and Aminoglycosides.",
        images: ["/Klebsiella_pneumoniae_resistance_trend.png"]
    },
    {
        title: "Correlation of Antibiotic Resistance Between Isolates (Heatmaps)",
        content: "These heatmaps show the correlation between bacterial isolates based on their resistance to various antibiotics, helping identify resistance patterns. In Africa, where AMR data is fragmented, these visualizations can guide researchers and policymakers in understanding regional resistance trends. This is key for vaccine development, as it highlights the most resistant strains, enabling vaccines tailored to Africa's AMR challenges.",
        images: ["/heatmap_correlation/Acinetobacter baumannii.png",
            "/heatmap_correlation/Enterococcus faecium.png",
            "/heatmap_correlation/Haemophilus influenzae.png",
            "/heatmap_correlation/Klebsiella pneumoniae.png",
            "/heatmap_correlation/Pseudomonas aeruginosa.png",
            "/heatmap_correlation/Staphylococcus aureus.png",
            "/heatmap_correlation/Streptococcus pneumoniae.png"]
    },
    {
        title: "Resistance of Bacteria to Different Antibiotic Classes by Age Group",
        content: "These plots visualize age-specific resistance patterns for various bacterial species to different antibiotics. This information is crucial for developing vaccines targeting vulnerable populations, especially children and the elderly, who often have weaker immune systems and face higher risks from infections. By understanding age-specific trends, we can tailor vaccines to address the most pressing AMR challenges.",
        images: ["/resistance_by_age_group/resistance_Acinetobacter baumannii_1.png",
            "/resistance_by_age_group/resistance_Enterococcus faecium_1.png",
            "/resistance_by_age_group/resistance_Haemophilus influenzae_1.png",
            "/resistance_by_age_group/resistance_Klebsiella pneumoniae_1.png",
            "/resistance_by_age_group/resistance_Neisseria gonorrhoeae_1.png",
            "/resistance_by_age_group/resistance_Pseudomonas aeruginosa_1.png",
            "/resistance_by_age_group/resistance_Staphylococcus aureus_1.png",
            "/resistance_by_age_group/resistance_Streptococcus pneumoniae_1.png"]
    },
    {
        title: "Resistance of Bacteria to Different Antibiotic Classes by Infection Type",
        content: "These plots show how bacterial resistance varies by infection type (e.g., urinary tract infections, bloodstream infections) and antibiotic class. The bars represent the resistance levels for each infection type, revealing which antibiotics are becoming less effective.",
        images: ["/resistance_by_infection_type/resistance_Acinetobacter baumannii_1.png",
            "/resistance_by_infection_type/resistance_Enterococcus faecium_1.png",
            "/resistance_by_infection_type/resistance_Haemophilus influenzae_1.png",
            "/resistance_by_infection_type/resistance_Klebsiella pneumoniae_1.png",
            "/resistance_by_infection_type/resistance_Neisseria gonorrhoeae_1.png",
            "/resistance_by_infection_type/resistance_Pseudomonas aeruginosa_1.png",
            "/resistance_by_infection_type/resistance_Staphylococcus aureus_1.png",
            "/resistance_by_infection_type/resistance_Streptococcus pneumoniae_1.png"]
    },
    {
        title: "Resistance Trend of Bacteria to Antibiotics Over Time (Heatmaps)",
        content: "These heatmap tracks changes in bacterial resistance to various antibiotic classes over the years, revealing trends in how resistance has evolved.",
        images: ["/specie_trend_overtime/Acinetobacter baumannii_heatmap.png",
            "/specie_trend_overtime/Enterococcus faecium_heatmap.png",
            "/specie_trend_overtime/Haemophilus influenzae_heatmap.png",
            "/specie_trend_overtime/Klebsiella pneumoniae_heatmap.png",
            "/specie_trend_overtime/Pseudomonas aeruginosa_heatmap.png",
            "/specie_trend_overtime/Staphylococcus aureus_heatmap.png",
            "/specie_trend_overtime/Streptococcus pneumoniae_heatmap.png"]
    },
]

export default function StorytellingComponent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const { theme } = useTheme()

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <div className="space-y-8 p-5 pt-7">
            <h2 className="text-2xl font-bold mb-4 col">Our Research</h2>
            <h6 className="text-2xl font-bold mb-4 col p-6">Why Develop Vaccines for MDR Pathogens?</h6>
            <div className="flex flex-col md:flex-row items-center gap-6 pl-12">
                <p className="flex-1">
                    Antimicrobial resistance (AMR) poses a severe threat to global health, particularly in Africa, where a group of pathogens is responsible for significant morbidity and mortality. The bacteria <em>Enterococcus faecium</em>, <em>Staphylococcus aureus</em>, <em>Klebsiella pneumoniae</em>, <em>Acinetobacter baumannii</em>, <em>Pseudomonas aeruginosa</em>, <em>Enterobacter cloacae</em>, and <em>Escherichia coli</em> (collectively known as ESKAPE-E pathogens) are among the most critical contributors to this burden. These species, listed as global priority pathogens by the WHO, are prevalent in both hospital and community settings, disproportionately affecting vulnerable populations like infants and the immunocompromised.
                    <br /><br />
                    Recent studies, such as Ayobami et al. (2022), emphasize the urgent need for vaccine development targeting these pathogens. Sartorius et al. (2024) revealed that third-generation cephalosporin-resistant <em>Klebsiella pneumoniae</em> and methicillin-resistant <em>Staphylococcus aureus</em> are the most common pathogen-drug combinations driving deaths due to AMR across 25 and 16 African countries, respectively. Combined, these pathogens account for 53% and 34% of AMR-related deaths across 47 African countries.
                    <br /><br />
                    Our work aims to support the development of vaccines for multidrug-resistant (MDR) bacteria and encourages the need for a repository of potential vaccine targets, a crucial step towards combating the growing AMR crisis in Africa.
                </p>
            </div>

            {storyData.map((section, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className={`shadow-none border-none ${theme === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-base-100'}`}>
                        <CardContent className="p-6">
                            <div
                                className="cursor-pointer"
                                onClick={() => toggleExpand(index)}
                            >
                                <h2 className="text-2xl font-bold mb-4 flex items-center justify-between col pb-6">
                                    {section.title || `Section ${index + 1}`}
                                    <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                        {expandedIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </span>
                                </h2>
                            </div>
                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 mt-4 pl-6">
                                            <div className="flex-1">
                                                <p>{section.content}</p>
                                            </div>
                                            <div className="flex-1 p-2">
                                                <Carousel className="w-full">
                                                    <CarouselContent>
                                                        {section.images.filter(img => img !== "").map((image, imageIndex) => (
                                                            <CarouselItem key={imageIndex}>
                                                                <img
                                                                    src={image}
                                                                    alt={`${section.title} - Image ${imageIndex + 1}`}
                                                                    className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                                                                    onClick={() => setSelectedImage(image)}
                                                                />
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    <CarouselPrevious />
                                                    <CarouselNext />
                                                </Carousel>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0">
                    {selectedImage && (
                        <ZoomableImage src={selectedImage} alt="Full size image" />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
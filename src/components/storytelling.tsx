import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomableImage } from './ZoomableImage';
import { useTheme } from 'next-themes';

interface StorySection {
    title: string;
    content: string;
    image: string;
}

const storyData: StorySection[] = [
    {
        title: "Multi-Drug Resistance (MDR) Pattern Heatmap",
        content: "This visualization depicts the MDR pattern of various bacterial species in Africa, showing the percentage of resistance to different antibiotic classes. Notably, Klebsiella pneumoniae and Acinetobacter baumannii exhibit multidrug resistance (MDR) across critical antibiotics, including Carbapenems and Cephalosporins, highlighting serious concerns about treatment options for infections caused by these pathogens.",
        image: "/mdr_pattern_africa.png"
    },
    {
        title: "Resistance Trend I (Time-Series)",
        content: "Based on the ATLAS dataset:\n\n• Cephalosporins and Fluoroquinolones have consistently high resistance from K. pneumoniae, with a peak around 2008 and a gradual decline, though resistance remains significant.\n\n• Carbapenems show relatively lower resistance but a slight upward trend after 2016, indicating growing resistance to these last-line treatments.\n\n• Sulfonamides exhibit the highest resistance across all years, staying above 50% throughout the timeline.\n\n• Aminoglycosides display a sharp increase in resistance after 2016, indicating an alarming rise.\n\nThese trends indicate that Klebsiella pneumoniae is developing increased resistance to multiple antibiotic classes over time, particularly to critical treatments like Carbapenems and Aminoglycosides.",
        image: "Klebsiella pneumoniae_resistance_trend.png",
        image: "/species_trend.gif"
    },

    {
        title: "Resistance Trend II",
        content: "The chart illustrates the global burden of infection caused by various resistant bacteria. Klebsiella pneumoniae ranks as the third highest, following Staphylococcus aureus and Escherichia coli. Its high resistance count underscores its role as a significant threat to global health, with a particularly high infection burden and mortality rate in Africa.",
        image: "/Rplot02.png"
    },
    {
        title: "",
        content: "The chart illustrates the global distribution of resistance, intermediate, and susceptible phenotypes for various bacterial species. Klebsiella pneumoniae shows a relatively high percentage of resistance, indicating its significant contribution to the global antimicrobial resistance burden. However, it's important to note that other species, such as Staphylococcus aureus and Enterococcus faecium, also exhibit high levels of resistance. This highlights the need for comprehensive strategies to address the growing threat of antimicrobial resistance across multiple bacterial species.",
        image: "/"
    },
    // More sections...
]

export default function StorytellingComponent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Track which section is expanded
    const { theme } = useTheme();

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the expanded section
    }

    return (
        <>
            <div className="space-y-8 p-5 pt-7">
                <h2 className="text-2xl font-bold mb-4 col">Our Research</h2>
                <h6 className="text-2xl font-bold mb-4 col">Why Develop Vaccines for MDR Pathogens?</h6>
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <p className="flex-1">
                        Antimicrobial resistance (AMR) poses a severe threat to global health, particularly in Africa, where a group of pathogens is responsible for significant morbidity and mortality. The bacteria <em>Enterococcus faecium</em>, <em>Staphylococcus aureus</em>, <em>Klebsiella pneumoniae</em>, <em>Acinetobacter baumannii</em>, <em>Pseudomonas aeruginosa</em>, <em>Enterobacter cloacae</em>, and <em>Escherichia coli</em> (collectively known as ESKAPE-E pathogens) are among the most critical contributors to this burden. These species, listed as global priority pathogens by the WHO, are prevalent in both hospital and community settings, disproportionately affecting vulnerable populations like infants and the immunocompromised.
                        <br/><br/>
                        Recent studies, such as Ayobami et al. (2022), emphasize the urgent need for vaccine development targeting these pathogens. Sartorius et al. (2024) revealed that third-generation cephalosporin-resistant <em>Klebsiella pneumoniae</em> and methicillin-resistant <em>Staphylococcus aureus</em> are the most common pathogen-drug combinations driving deaths due to AMR across 25 and 16 African countries, respectively. Combined, these pathogens account for 53% and 34% of AMR-related deaths across 47 African countries.
                        <br/><br/>
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
                                {/* Title as dropdown toggle */}
                                <h2 
                                    className="text-2xl font-bold mb-4 col cursor-pointer" 
                                    onClick={() => toggleExpand(index)}
                                >
                                    {section.title || `Section ${index + 1}`}
                                </h2>

                                {/* Conditionally render content and image based on expansion */}
                                {expandedIndex === index && (
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <p className="flex-1">{section.content}</p>
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="w-full md:w-1/2 h-auto rounded-lg shadow-md cursor-pointer"
                                            onClick={() => setSelectedImage(section.image)}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {/* Dialog for zoomable image */}
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0">
                        {selectedImage && (
                            <ZoomableImage src={selectedImage} alt="Full size image" />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

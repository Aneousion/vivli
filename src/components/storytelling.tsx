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
        title: "Plots",
        content: "This chart illustrates the global burden of infection caused by various resistant bacteria. Klebsiella pneumoniae ranks as the fourth highest, following Staphylococcus aureus, Escherichia coli, and Pseudomonas aeruginosa. Its high resistance count underscores its role as a significant threat to global health, with a particularly high infection burden and mortality rate.",
        image: "/Rplot.png"
    },
    {
        title: "",
        content: "The chart illustrates the global burden of infection caused by various resistant bacteria. Klebsiella pneumoniae ranks as the fourth highest, following Staphylococcus aureus, Escherichia coli, and Pseudomonas aeruginosa. Its high resistance count underscores its role as a significant threat to global health, with a particularly high infection burden and mortality rate in Europe.",
        image: "/Rplot01.png"
    },
    {
        title: "",
        content: "The chart illustrates the global burden of infection caused by various resistant bacteria. Klebsiella pneumoniae ranks as the third highest, following Staphylococcus aureus and Escherichia coli. Its high resistance count underscores its role as a significant threat to global health, with a particularly high infection burden and mortality rate in Africa.",
        image: "/Rplot02.png"
    },
    {
        title: "",
        content: "The chart illustrates the global distribution of resistance, intermediate, and susceptible phenotypes for various bacterial species. Klebsiella pneumoniae shows a relatively high percentage of resistance, indicating its significant contribution to the global antimicrobial resistance burden. However, it's important to note that other species, such as Staphylococcus aureus and Enterococcus faecium, also exhibit high levels of resistance. This highlights the need for comprehensive strategies to address the growing threat of antimicrobial resistance across multiple bacterial species.",
        image: "/Rplot03.png"
    },
    {
        title: "",
        content: "The chart illustrates the distribution of resistance, intermediate, and susceptible phenotypes for various bacterial species in Africa. Klebsiella pneumoniae shows a relatively high percentage of resistance, indicating its significant contribution to the antimicrobial resistance burden in the region. However, it's important to note that other species, such as Escherichia coli and Staphylococcus aureus, also exhibit high levels of resistance. This highlights the need for comprehensive strategies to address the growing threat of antimicrobial resistance across multiple bacterial species in Africa.",
        image: "/Rplot04.png"
    },
    {
        title: "",
        content: "The chart illustrates the distribution of resistance, intermediate, and susceptible phenotypes for various bacterial species in Nigeria. Klebsiella pneumoniae shows a relatively high percentage of resistance, indicating its significant contribution to the antimicrobial resistance burden in the country.",
        image: "/Rplot05.png"
    },
    {
        title: "",
        content: "The chart illustrates the frequency of resistance among various bacterial species in Africa. Klebsiella pneumoniae is prominently featured near the top, indicating its high prevalence of resistance. Other resistant organisms, such as Escherichia coli and Staphylococcus aureus, are also frequently observed.",
        image: "/Rplot06.png"
    },
    {
        title: "",
        content: "The chart illustrates the frequency of resistance among various bacterial species in Nigeria. Klebsiella pneumoniae is prominently featured near the top, indicating its high prevalence of resistance. Other resistant organisms, such as Escherichia coli and Staphylococcus aureus, are also frequently observed.",
        image: "/Rplot07.png"
    },
    {
        title: "<b>Multi-Drug Resistance Heatmap by Species<b>",
        content: "This heatmap presents a matrix of multiple drug-resistant (MDR) patterns by comparing bacterial species and their resistance to various antibiotic classes in Africa. This heatmap provides clear evidence of the most concerning bacterial species in Africa, particularly those that have become resistant to multiple antibiotic classes (A. baumanii  and K. pneumoniae for example). Given Africa’s high burden of MDR bacteria, such visualizations help prioritize species for vaccine research by highlighting those most resistant to diverse drug classes. Focusing vaccine development on these species could reduce the widespread burden of resistant infections across multiple countries.",
        image: "/mdr_pattern_africa.png"
    },
    {
        title: "GIFs",
        content: "These heatmaps visualize the correlation between different bacterial isolates based on their resistance profiles to multiple antibiotics and helps in identifying patterns of resistance clustering across isolates. The heatmaps offer insights into how bacterial isolates respond similarly or differently to antibiotic treatments. In Africa, where data on AMR is often fragmented, such visualizations can help researchers and policymakers identify patterns in resistance across regions or health settings, contributing to understanding local resistance dynamics. This is crucial for vaccine development because it allows targeting the most concerning strains showing consistent resistance patterns, making the case for vaccines tailored to Africa's most pressing AMR challenges.",
        image: "/correlation_heatmaps.gif"
    },
    {
        title: "",
        content: "These are bar plots showing resistance of bacteria to different antibiotic classes by age group. To display the resistance levels of different bacterial species to various antibiotic classes, stratified by patient age groups, bar plots were used, with each bar representing a specific age group’s resistance to a class of antibiotics. Understanding age-specific resistance patterns is critical in designing vaccines that target the most vulnerable populations—children and the elderly, who often have weaker immune systems and face higher risks from infections. In Africa, where young children frequently experience bacterial infections due to underdeveloped health infrastructure, these visualizations justify the development of age-focused vaccines that target age-specific bacterial strains and resistance patterns. This is impactful as it connects resistance data with demographic vulnerability.",
        image: "/resistance_by_agegroup.gif"
    },
    {
        title: "",
        content: "These plots show how bacterial resistance varies by infection type (e.g., urinary tract infections, bloodstream infections) and antibiotic class. The bars represent the resistance levels for each infection type, revealing which antibiotics are becoming less effective.",
        image: "/resistance_by_species.gif"
    },
    {
        title: "",
        content: "These heatmap tracks changes in bacterial resistance to various antibiotic classes over the years, revealing trends in how resistance has evolved.",
        image: "/species_heatmaps_animation.gif"
    },
    {
        title: "",
        content: "These time series charts show resistance trends for various antibiotic classes over the years, offering a visual representation of how resistance to each class has changed across time. Each line represents an antibiotic class, with fluctuations indicating changes in resistance rates. This allows for the monitoring of trends and can highlight which antibiotics are losing efficacy faster. For Africa, these charts highlight the growing problem of resistance in specific drug classes, underscoring the urgency of vaccine development to curb the spread of resistant pathogens. The time-series of Klebsiella pneumoniae reveals a concerning uptrend in resistance rates in recent years, indicating that this pathogen is becoming increasingly difficult to treat with available antibiotics. This is particularly alarming because K. pneumoniae is a common cause of hospital-acquired infections, including pneumonia, bloodstream infections, and urinary tract infections, and it is associated with high morbidity and mortality rates in Africa.",
        image: "/species_trend.gif"
    }
]

export default function StorytellingComponent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { theme } = useTheme();

    return (
        <>
            <div className="space-y-8 p-5 pt-7">
                <h2 className="text-2xl font-bold mb-4 col">Our Research</h2>
                {storyData.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className={`shadow-none border-none ${theme === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-base-100'}`}>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-4 col">{section.title}</h2>
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
                <h2 className="text-2xl font-bold mb-4 col">Justification for Choosing the 10 Bacteria:</h2>
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <p className="flex-1">The 10 bacteria (Enterococcus faecium, Staphylococcus aureus, Klebsiella pneumoniae, Acinetobacter baumannii, Pseudomonas aeruginosa, Enterobacter cloacae, Escherichia coli, Streptococcus pneumoniae, Haemophilus influenzae, Neisseria gonorrhoeae) were chosen due to their significant contribution to the AMR burden in Africa, including species such as Enterococcus faecium, Staphylococcus aureus, Klebsiella pneumoniae, Acinetobacter baumannii, Pseudomonas aeruginosa, Enterobacter cloacae and Escherichia coli (ESKAPE-E) from the WHO’s global priority pathogens list (Ayobami et. al, 2022). These bacteria are responsible for high morbidity and mortality rates due to their resistance to multiple antibiotics, and they are prevalent in hospitals, communities, and vulnerable populations such as infants and immunocompromised individuals.
                        Sartorius et. al. (2024) revealed that third-generation cephalosporin-resistant Klebsiella pneumoniae and methicillin-resistant Staphylococcus aureus are the most common pathogen-drug combinations causing deaths due to antibiotic resistance in Africa. These combinations were identified in 25 and 16 countries, respectively, accounting for 53% and 34% of the total deaths attributed to AMR across the 47 countries in Africa.
                    </p>
                </div>
            </div>
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0">
                    {selectedImage && (
                        <ZoomableImage src={selectedImage} alt="Full size image" />
                    )}
                </DialogContent>
            </Dialog>


        </>
    );
}

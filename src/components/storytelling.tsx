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
        title: "Our Research",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot01.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot02.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot03.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot04.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot05.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot06.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/Rplot07.png"
    },
    {
        title: "",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis quam nec magna faucibus, vel bibendum magna commodo. Donec sit amet nisl quis nisi tincidunt commodo. Sed vel efficitur ligula. Aenean accumsan magna vel dui rutrum, nec eleifend odio lobortis. Morbi ac arcu ac augue hendrerit iaculis. Cras efficitur lacus ac magna efficitur, at volutpat pede condimentum. Fusce tempus rhoncus tellus, eu finibus mauris finibus eu. Phasellus vestibulum, ipsum vel bibendum facilisis, ipsum magna volutpat enim, vel sodales enim massa vel enim. Praesent vel turpis varius, vulputate magna ut, tempor enim. Aliquam erat volutpat. Donec at facilisis magna. Etiam vitae dolor dolor. Sed vulputate velit in magna lobortis, vel vestibulum ipsum eleifend. Aliquam erat volutpat. Aliquam erat volutpat. Curabitur vel nibh et magna faucibus tristique. Etiam in feugiat magna. Sed efficitur magna vel magna bibendum.",
        image: "/mdr_pattern_africa.png"
    },
    {
        title: "Data Visualization1",
        content: "This animated chart shows the trend of our key metrics over time...",
        image: "/correlation_heatmaps.gif"
    },
    {
        title: "Data Visualization2",
        content: "This animated chart shows the trend of our key metrics over time...",
        image: "/resistance_by_agegroup.gif"
    },
    {
        title: "Data Visualization3",
        content: "This animated chart shows the trend of our key metrics over time...",
        image: "/resistance_by_species.gif"
    },
    {
        title: "Data Visualization4",
        content: "This animated chart shows the trend of our key metrics over time...",
        image: "/species_heatmaps_animation.gif"
    },
    {
        title: "Data Visualization5",
        content: "This animated chart shows the trend of our key metrics over time...",
        image: "/species_trend.gif"
    }
]

export default function StorytellingComponent() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { theme } = useTheme();

    return (
        <>
            <div className="space-y-8 p-5 pt-7">
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
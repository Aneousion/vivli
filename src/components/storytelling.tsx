import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/components/ui/tabs";
import { Dropdown } from "@/components/ui/dropdown";
import { useTheme } from 'next-themes';
import { ZoomableImage } from './ZoomableImage';

interface StorySection {
  title: string;
  content: string;
  image: string;
}

const storyData: StorySection[] = [
  {
    title: "Global Burden of Resistant Bacteria",
    content: "Klebsiella pneumoniae ranks among the top threats globally, contributing to high mortality rates due to its resistance.",
    image: "/Rplot.png"
  },
  {
    title: "Klebsiella Resistance in Europe",
    content: "Klebsiella pneumoniae shows alarming resistance levels in Europe, contributing to high infection burdens.",
    image: "/Rplot01.png"
  },
  {
    title: "Klebsiella Resistance in Africa",
    content: "Klebsiella pneumoniae presents a serious AMR burden in Africa, highlighting the need for targeted vaccine development.",
    image: "/Rplot02.png"
  },
  // More sections
];

export default function StorytellingComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <>
      <div className="space-y-8 p-5 pt-7">
        {/* Introduction section collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`shadow-none border-none ${theme === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-base-100'}`}>
            <CardContent className="p-6">
              <Dropdown title="Introduction: Justification for Vaccine Development" openByDefault>
                <p>
                  The 10 bacteria (Enterococcus faecium, Staphylococcus aureus, Klebsiella pneumoniae, Acinetobacter baumannii, etc.) were chosen due to their significant contribution to the AMR burden in Africa. Key studies show how their resistance patterns make them crucial targets for vaccines.
                </p>
              </Dropdown>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visualization and research data with tabs */}
        <Tabs>
          <TabList>
            <Tab>Visualizations</Tab>
            <Tab>Bacteria Insights</Tab>
            <Tab>Resistance Trends</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storyData.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className={`shadow-none border-none ${theme === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-base-100'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Dropdown title={section.title}>
                            <p>{section.content}</p>
                          </Dropdown>
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full md:w-1/2 h-auto rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                            onClick={() => setSelectedImage(section.image)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="p-6">
                <Dropdown title="Why Focus on Klebsiella pneumoniae?">
                  <p>
                    Klebsiella pneumoniae ranks as one of the most resistant bacteria globally, particularly in Africa, where it contributes heavily to the AMR burden. This makes it a prime candidate for vaccine research.
                  </p>
                </Dropdown>
                <Dropdown title="The Global Challenge of AMR in Klebsiella">
                  <p>
                    Countries worldwide, including Europe and Africa, are seeing increased resistance from Klebsiella, driving up mortality rates from resistant infections.
                  </p>
                </Dropdown>
                {/* More bacteria insights can be added here */}
              </div>
            </TabPanel>

            <TabPanel>
              <div className="p-6">
                <Dropdown title="Trends in Bacterial Resistance Over Time">
                  <p>
                    Resistance trends reveal a concerning increase in multi-drug resistant bacteria, particularly Klebsiella, over the past decade, necessitating urgent action.
                  </p>
                </Dropdown>
                <Dropdown title="Antibiotic Effectiveness Diminishing">
                  <p>
                    Antibiotics like third-generation cephalosporins are losing efficacy against resistant strains, highlighting the need for alternative solutions such as vaccines.
                  </p>
                </Dropdown>
                {/* More trend analysis can be added */}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Justification for 10 Bacteria section */}
        <div className="p-6">
          <Dropdown title="Justification for Choosing the 10 Bacteria">
            <p>
              The 10 bacteria were selected based on their significant AMR contribution in Africa and high mortality rates associated with resistance. These pathogens are critical vaccine targets to reduce the AMR burden.
            </p>
          </Dropdown>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0">
          {selectedImage && <ZoomableImage src={selectedImage} alt="Full size image" />}
        </DialogContent>
      </Dialog>
    </>
  );
}

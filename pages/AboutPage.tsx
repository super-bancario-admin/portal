
import React from 'react';
import PageTitle from '../components/common/PageTitle';
import type { MissionCard } from '../types';
import { MissionIcon, VisionIcon, ValuesIcon } from '../components/icons/AboutPageIcons';

const AboutCard: React.FC<{ card: MissionCard }> = ({ card }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-brand-gold-light mx-auto mb-6">
            <card.icon className="h-10 w-10 text-brand-gold" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-brand-teal-dark mb-3">{card.title}</h3>
        <p className="text-brand-grey-medium">{card.description}</p>
    </div>
);

const AboutPage: React.FC = () => {

  const missionCards: MissionCard[] = [
    {
      icon: MissionIcon,
      title: "Nossa Missão",
      description: "Conectar profissionais e instituições do setor financeiro com informações e análises de alta qualidade, promovendo a transparência, a inovação e o crescimento sustentável da economia angolana."
    },
    {
      icon: VisionIcon,
      title: "Nossa Visão",
      description: "Ser a referência indispensável e a voz mais respeitada no debate sobre o futuro do setor bancário em Angola, influenciando líderes, inovadores e reguladores."
    },
    {
      icon: ValuesIcon,
      title: "Nossos Valores",
      description: "Rigor, Excelência, Inovação, Colaboração e Compromisso com o desenvolvimento de Angola e seu setor bancário."
    }
  ];

  return (
    <div>
      <PageTitle 
        title="Sobre Nós"
        subtitle="Ser Bancário é o principal portal de notícias e análises do setor financeiro de Angola. Nossa missão é fornecer informações precisas, insights profundos e uma plataforma para o diálogo construtivo que impulsiona o futuro da banca no país."
      />

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {missionCards.map(card => <AboutCard key={card.title} card={card} />)}
            </div>
        </div>
      </div>

       <div className="py-20 bg-brand-grey-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-teal-dark">Nosso Compromisso</h2>
            <p className="mt-4 text-lg text-brand-grey-medium max-w-3xl mx-auto">
                Trabalhamos todos os dias para entregar conteúdo de qualidade e promover o desenvolvimento do setor bancário.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                    <h4 className="text-xl font-bold text-brand-grey-dark mb-2">Comunidade</h4>
                    <p className="text-brand-grey-medium">Conectamos profissionais do setor bancário para troca de conhecimentos e experiências.</p>
                </div>
                 <div>
                    <h4 className="text-xl font-bold text-brand-grey-dark mb-2">Excelência</h4>
                    <p className="text-brand-grey-medium">Comprometemo-nos com a qualidade e precisão em todas as nossas publicações e análises.</p>
                </div>
                 <div>
                    <h4 className="text-xl font-bold text-brand-grey-dark mb-2">Inovação</h4>
                    <p className="text-brand-grey-medium">Promovemos discussões sobre novas tecnologias e tendências que moldam o futuro bancário.</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;

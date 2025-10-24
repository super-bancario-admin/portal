
import React from 'react';
import { CONTACT_INFO } from '../constants';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-brand-grey-dark">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-teal-deep mb-4">
            Política de Privacidade
          </h1>
          <p className="text-md text-brand-grey-medium mb-10">
            Última atualização: 23 de Julho de 2024
          </p>
          
          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              O portal "Ser Bancário" ("nós", "nosso") está empenhado em proteger a sua privacidade. Esta Política de Privacidade explica como recolhemos, usamos, divulgamos e protegemos as suas informações quando visita o nosso website.
            </p>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">1. Informação que Recolhemos</h2>
              <p className="mb-2">Podemos recolher informações sobre si de várias formas:</p>
              <p>
                <strong>Informação Pessoalmente Identificável:</strong> Podemos recolher informações pessoalmente identificáveis, como o seu nome e endereço de e-mail, quando nos contacta diretamente ou se regista para um evento.
              </p>
              <p>
                <strong>Dados de Utilização:</strong> Recolhemos automaticamente certas informações quando acede ao site, como o seu endereço IP, tipo de navegador, sistema operativo, páginas visitadas e as datas/horas das suas visitas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">2. Uso da Sua Informação</h2>
              <p>Usamos as informações recolhidas para:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Fornecer, operar e manter o nosso website.</li>
                <li>Processar as suas reservas para eventos e enviar-lhe as confirmações.</li>
                <li>Responder às suas questões e fornecer suporte ao cliente.</li>
                <li>Analisar o uso do website para melhorar o nosso conteúdo e serviços.</li>
                <li>Enviar-lhe newsletters ou materiais de marketing, caso tenha optado por recebê-los.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">3. Política de Cookies</h2>
              <p>
                Usamos cookies e tecnologias de rastreamento semelhantes para recolher e usar informações pessoais sobre si. Os cookies são pequenos ficheiros de dados armazenados no seu dispositivo que nos ajudam a melhorar o nosso site e a sua experiência.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">4. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança administrativas, técnicas e físicas para ajudar a proteger as suas informações pessoais. No entanto, lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrónico é 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">5. Direitos do Utilizador</h2>
              <p>
                Você tem o direito de aceder, corrigir ou solicitar a exclusão das suas informações pessoais. Se desejar exercer algum destes direitos, por favor, contacte-nos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">6. Alterações a Esta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade de tempos em tempos. A versão atualizada será indicada por uma data de "Última atualização" e a versão atualizada entrará em vigor assim que estiver acessível.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">7. Contacte-nos</h2>
              <p>
                Se tiver alguma questão sobre esta Política de Privacidade, por favor, contacte-nos através do e-mail: <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-gold font-semibold hover:underline">{CONTACT_INFO.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

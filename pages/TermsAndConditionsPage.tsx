
import React from 'react';
import { CONTACT_INFO } from '../constants';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-brand-grey-dark">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-teal-deep mb-4">
            Termos e Condições de Uso
          </h1>
          <p className="text-md text-brand-grey-medium mb-10">
            Última atualização: 23 de Julho de 2024
          </p>
          
          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              Bem-vindo ao "Ser Bancário". Ao aceder e utilizar este website, você aceita e concorda em cumprir os seguintes termos e condições de uso. Se não concordar com estes termos, não deverá utilizar o nosso website.
            </p>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">1. Uso do Website</h2>
              <p>
                O conteúdo e os materiais deste website são fornecidos apenas para sua informação geral e uso pessoal. Não é permitido modificar, copiar, distribuir, transmitir, exibir, executar, reproduzir, publicar, licenciar, criar trabalhos derivados, transferir ou vender qualquer informação, software, produtos ou serviços obtidos a partir deste site sem o nosso consentimento prévio por escrito.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">2. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo presente neste website, incluindo, mas não se limitando a, textos, gráficos, logotipos, ícones, imagens e software, é propriedade do "Ser Bancário" ou dos seus fornecedores de conteúdo e está protegido pelas leis de direitos de autor de Angola e internacionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">3. Limitação de Responsabilidade</h2>
              <p>
                A informação neste website é fornecida "como está", sem garantias de qualquer tipo, expressas ou implícitas. Embora nos esforcemos para fornecer informações precisas e atualizadas, não garantimos que o conteúdo seja isento de erros ou omissões.
              </p>
              <p>
                Em nenhuma circunstância o "Ser Bancário" será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais que resultem do uso ou da incapacidade de usar este website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">4. Links para Terceiros</h2>
              <p>
                Este website pode conter links para outros websites que não são operados por nós. Estes links são fornecidos apenas para sua conveniência. Não temos controlo sobre o conteúdo desses sites e não assumimos qualquer responsabilidade por eles ou por qualquer perda ou dano que possa advir do seu uso.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">5. Alterações aos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no website. O seu uso continuado do site após a publicação das alterações constitui a sua aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">6. Lei Aplicável</h2>
              <p>
                Estes termos e condições são regidos e interpretados de acordo com as leis de Angola, e você submete-se irrevogavelmente à jurisdição exclusiva dos tribunais dessa localização.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-sans mb-3">7. Contacto</h2>
              <p>
                Se tiver alguma questão sobre estes Termos de Uso, por favor, contacte-nos através do e-mail: <a href={`mailto:${CONTACT_INFO.email}`} className="text-brand-gold font-semibold hover:underline">{CONTACT_INFO.email}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

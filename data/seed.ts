import type { Article, Event, Sponsor, User, Permissions } from '../types';
import { ArticleType } from '../types';

// Permissions Templates
const superAdminPermissions: Permissions = {
  manageAdmins: true,
  manageManagers: true,
  manageBloggers: true,
  fullNewsCRUD: true,
  fullBlogCRUD: true,
  viewAllAnalytics: true,
  viewLimitedAnalytics: true,
  createContent: true,
  crudOwnContent: true,
};

const adminPermissions: Permissions = {
  manageAdmins: false,
  manageManagers: true,
  manageBloggers: true,
  fullNewsCRUD: true,
  fullBlogCRUD: true,
  viewAllAnalytics: true,
  viewLimitedAnalytics: true,
  createContent: true,
  crudOwnContent: true,
};

const managerPermissions: Permissions = {
  manageAdmins: false,
  manageManagers: false,
  manageBloggers: true,
  fullNewsCRUD: true,
  fullBlogCRUD: true,
  viewAllAnalytics: false,
  viewLimitedAnalytics: true,
  createContent: true,
  crudOwnContent: true,
};

const bloggerPermissions: Permissions = {
  manageAdmins: false,
  manageManagers: false,
  manageBloggers: false,
  fullNewsCRUD: false,
  fullBlogCRUD: false,
  viewAllAnalytics: false,
  viewLimitedAnalytics: false,
  createContent: true,
  crudOwnContent: true,
};

export const users: User[] = [
  {
    id: 1,
    username: 'super',
    passwordHash: 'M4st&rB@nc4r!025',
    role: 'Super Admin',
    permissions: superAdminPermissions,
  },
  {
    id: 2,
    username: 'Administrador',
    email: 'admin@serbancario.ao',
    passwordHash: 'adminpassword', // Placeholder password
    role: 'Admin',
    permissions: adminPermissions,
  },
  {
    id: 3,
    username: 'Gestor',
    email: 'gestor@serbancario.ao',
    passwordHash: 'gestorpassword', // Placeholder password
    role: 'Admin',
    permissions: adminPermissions,
  },
  {
    id: 4,
    username: 'Geral',
    email: 'geral@serbancario.ao',
    passwordHash: 'geralpassword', // Placeholder password
    role: 'Manager',
    permissions: managerPermissions,
  },
  {
    id: 5,
    username: 'Support',
    email: 'contacto@serbancario.ao',
    passwordHash: 'supportpassword', // Placeholder password
    role: 'Manager',
    permissions: managerPermissions,
  },
];


export const news: Article[] = [
  {
    id: 1,
    type: ArticleType.News,
    title: "Banco Nacional de Angola Anuncia Novas Medidas para Fortalecer o Kwanza",
    slug: "bna-novas-medidas-kwanza",
    excerpt: "O BNA implementou um novo pacote de políticas monetárias com o objetivo de controlar a inflação e estabilizar a moeda nacional face às flutuações do mercado internacional.",
    body: "<p>Num comunicado oficial emitido esta manhã, o Banco Nacional de Angola (BNA) detalhou uma série de medidas estratégicas destinadas a fortalecer o Kwanza. Entre as principais ações, destacam-se o aumento da taxa de juro de referência em 50 pontos-base e a implementação de restrições mais rigorosas sobre as operações cambiais dos bancos comerciais.</p><p>Segundo o Governador do BNA, estas medidas são cruciais para 'ancorar as expectativas de inflação e garantir a estabilidade macroeconómica do país'. O pacote visa também aumentar as reservas internacionais líquidas, criando um colchão de segurança contra choques externos. Analistas financeiros receberam as notícias com otimismo cauteloso, prevendo um período de ajuste no curto prazo, mas com potencial para benefícios duradouros na economia angolana.</p>",
    author: "Redação Ser Bancário",
    categories: ["Política Monetária", "Regulação"],
    tags: ["BNA", "Kwanza", "Inflação"],
    published_at: "2025-09-20T09:00:00Z",
    cover_image_url: "https://picsum.photos/seed/news1/800/600",
    is_featured: true,
  },
  {
    id: 2,
    type: ArticleType.News,
    title: "Inclusão Financeira em Angola Atinge Marco Histórico com 10 Milhões de Contas Bancárias",
    slug: "inclusao-financeira-marco-historico",
    excerpt: "O número de angolanos com acesso a serviços bancários formais duplicou nos últimos cinco anos, impulsionado pela expansão de contas móveis e agentes bancários.",
    body: "<p>Angola alcançou um marco significativo na sua jornada de inclusão financeira. Dados recentes do BNA revelam que o país ultrapassou a marca de 10 milhões de contas bancárias ativas. Este crescimento notável é atribuído em grande parte à digitalização dos serviços financeiros e à expansão da rede de agentes bancários, que levaram os serviços a zonas rurais e remotas.</p><p>A aposta em plataformas de mobile money foi um dos principais catalisadores, permitindo que cidadãos sem acesso a agências tradicionais pudessem realizar transações, poupar e aceder a microcrédito. O governo e os parceiros do setor privado continuam a colaborar para eliminar as barreiras restantes e promover a literacia financeira em todo o território nacional.</p>",
    author: "Ana Rodrigues",
    categories: ["Banca Digital", "Desenvolvimento"],
    tags: ["Inclusão Financeira", "Mobile Money"],
    published_at: "2025-09-18T14:30:00Z",
    cover_image_url: "https://picsum.photos/seed/news2/800/600",
  },
  {
    id: 3,
    type: ArticleType.News,
    title: "Crescimento das Fintechs em Angola: Um Ecossistema em Expansão",
    slug: "crescimento-fintechs-angola",
    excerpt: "O ecossistema de fintech em Angola tem crescido rapidamente, oferecendo soluções inovadoras para pagamentos, crédito e investimentos, atraindo a atenção de investidores locais e internacionais.",
    body: "<p>O setor de tecnologia financeira (fintech) em Angola está a viver um momento de expansão sem precedentes. Com um ambiente regulatório cada vez mais favorável e uma população jovem e conectada, startups angolanas estão a desenvolver soluções que resolvem problemas concretos do mercado financeiro. Desde plataformas de pagamento digital a soluções de microcrédito para pequenas e médias empresas, a inovação está a transformar a forma como os angolanos lidam com o dinheiro.</p>",
    author: "Carlos Mendes",
    categories: ["Fintech", "Inovação"],
    tags: ["Startups", "Investimento", "Tecnologia"],
    published_at: "2025-09-15T11:00:00Z",
    cover_image_url: "https://picsum.photos/seed/news3/800/600",
  },
  {
    id: 4,
    type: ArticleType.News,
    title: "Banca Angolana Aposta na Sustentabilidade com Linhas de Crédito Verde",
    slug: "banca-sustentabilidade-credito-verde",
    excerpt: "Os principais bancos do país estão a lançar produtos financeiros focados em projetos de energias renováveis, eficiência energética e agricultura sustentável.",
    body: "<p>Alinhados com as tendências globais de sustentabilidade, os bancos comerciais em Angola começaram a introduzir linhas de crédito verde. Estes produtos oferecem condições de financiamento mais favoráveis para empresas e projetos que demonstrem um impacto ambiental positivo. A iniciativa visa não só promover uma economia mais verde, mas também abrir novas oportunidades de negócio num setor em rápido crescimento. Projetos de energia solar, gestão de resíduos e agricultura orgânica estão entre os principais beneficiários destas novas linhas de financiamento.</p>",
    author: "Júlia Oliveira",
    categories: ["Sustentabilidade", "Crédito"],
    tags: ["ESG", "Crédito Verde", "Energias Renováveis"],
    published_at: "2025-09-12T16:45:00Z",
    cover_image_url: "https://picsum.photos/seed/news4/800/600",
  },
  {
    id: 5,
    type: ArticleType.News,
    title: "Nova Regulamentação de Cibersegurança para o Setor Bancário",
    slug: "regulamentacao-ciberseguranca-bancaria",
    excerpt: "O Banco Nacional de Angola (BNA) anunciou hoje um novo conjunto de diretrizes de cibersegurança para todas as instituições financeiras, visando proteger os dados dos clientes e fortalecer a infraestrutura digital do país.",
    body: "<p>Face ao aumento global das ameaças cibernéticas, o BNA publicou um novo regulamento que estabelece requisitos mínimos de segurança da informação para os bancos. As novas regras exigem a implementação de sistemas de autenticação multifator, a realização de testes de penetração regulares e a criação de planos de resposta a incidentes. O objetivo é garantir a resiliência do setor financeiro angolano e manter a confiança dos consumidores nos canais digitais.</p>",
    author: "Redação Ser Bancário",
    categories: ["Regulação", "Tecnologia"],
    tags: ["Cibersegurança", "BNA", "Banca Digital"],
    published_at: "2025-09-10T08:20:00Z",
    cover_image_url: "https://picsum.photos/seed/news5/800/600",
  },
  {
    id: 6,
    type: ArticleType.News,
    title: "Angola adere à rede de pagamentos da SADC para facilitar transações transfronteiriças",
    slug: "angola-rede-pagamentos-sadc",
    excerpt: "A integração de Angola no Sistema de Pagamentos Transfronteiriços da SADC (SADC-RTGS) promete reduzir custos e tempos de processamento para transferências internacionais na região.",
    body: "<p>O Ministério das Finanças confirmou a integração completa de Angola no sistema de pagamentos da Comunidade de Desenvolvimento da África Austral (SADC). Esta adesão permitirá que empresas e particulares realizem transferências de fundos para outros países membros de forma mais rápida, segura e económica. A medida é vista como um passo fundamental para impulsionar o comércio intra-regional e a integração económica de Angola no bloco.</p>",
    author: "David Costa",
    categories: ["Economia", "Pagamentos"],
    tags: ["SADC", "Comércio Internacional", "Transferências"],
    published_at: "2025-09-08T12:00:00Z",
    cover_image_url: "https://picsum.photos/seed/news6/800/600",
  },
];

export const blog: Article[] = [
  {
    id: 7,
    type: ArticleType.Blog,
    title: "O Futuro da Banca Digital em Angola: Tendências e Desafios",
    slug: "futuro-banca-digital-angola",
    excerpt: "Uma análise aprofundada sobre as tecnologias que estão a moldar o setor bancário angolano e os obstáculos que ainda precisam ser superados para uma verdadeira transformação digital.",
    body: "<p>A transformação digital está a redefinir o setor bancário em Angola a um ritmo sem precedentes. Este artigo explora as principais tendências, desde a inteligência artificial na análise de crédito até ao Open Banking, e discute os desafios inerentes, como a cibersegurança, a inclusão digital e a necessidade de requalificação profissional. Qual o caminho a seguir para que Angola capitalize plenamente sobre esta revolução?</p>",
    author: "Maria Santos",
    categories: ["Análise", "Opinião"],
    tags: ["Banca Digital", "Tecnologia", "Fintech"],
    published_at: "2025-09-19T10:00:00Z",
    cover_image_url: "https://picsum.photos/seed/blog1/800/600",
  },
  {
    id: 8,
    type: ArticleType.Blog,
    title: "Fintechs Angolanas: O Ecossistema em Crescimento",
    slug: "fintechs-angolanas-ecossistema-crescimento",
    excerpt: "Desafios que estão a revolucionar o setor financeiro. O setor fintech em Angola está em expansão, com várias startups a oferecer soluções inovadoras para pagamentos, créditos e investimentos. Este artigo explora as principais tendências, desafios e oportunidades neste mercado emergente.",
    body: "<p>O setor fintech em Angola está em franca expansão, com um número crescente de startups que procuram resolver problemas específicos do mercado financeiro local. Desde aplicações de pagamento móvel a plataformas de crowdfunding, estas empresas estão a trazer mais concorrência e inovação. No entanto, enfrentam desafios como o acesso a financiamento, a complexidade regulatória e a necessidade de construir a confiança do consumidor. Analisamos o estado atual e o potencial futuro deste ecossistema vibrante.</p>",
    author: "Ana Rodrigues",
    categories: ["Análise", "Fintech"],
    tags: ["Inovação", "Startups", "Angola"],
    published_at: "2025-09-17T09:00:00Z",
    cover_image_url: "https://picsum.photos/seed/blog2/800/600",
  },
  {
    id: 9,
    type: ArticleType.Blog,
    title: "Inclusão Financeira: Desafios e Oportunidades",
    slug: "inclusao-financeira-desafios-oportunidades",
    excerpt: "Como expandir o acesso aos serviços bancários. A inclusão financeira é uma prioridade para o desenvolvimento económico de Angola. Este post discute os principais desafios enfrentados para levar os serviços bancários a toda a população e explora as oportunidades que a tecnologia oferece para superar essas barreiras.",
    body: "<p>Apesar dos progressos recentes, uma parte significativa da população angolana ainda não tem acesso a serviços financeiros formais. A falta de infraestrutura em zonas rurais, os baixos níveis de literacia financeira e os custos associados são alguns dos principais obstáculos. Este post explora como as soluções digitais, como o mobile money e os agentes bancários, podem ser a chave para acelerar a inclusão financeira, promovendo o crescimento económico e a redução da pobreza.</p>",
    author: "Carlos Mendes",
    categories: ["Opinião", "Desenvolvimento"],
    tags: ["Inclusão Financeira", "Desenvolvimento"],
    published_at: "2025-09-14T15:00:00Z",
    cover_image_url: "https://picsum.photos/seed/blog3/800/600",
  },
  {
    id: 10,
    type: ArticleType.Blog,
    title: "O Papel da Literacia Financeira no Empoderamento Económico",
    slug: "papel-literacia-financeira-empoderamento",
    excerpt: "Saber gerir o dinheiro é a base para a estabilidade e o crescimento. Discutimos a importância de promover a educação financeira em Angola como ferramenta para o empoderamento individual e coletivo.",
    body: "<p>Mais do que apenas saber poupar, a literacia financeira envolve compreender conceitos como juros, investimento, crédito e risco. Uma população financeiramente educada toma melhores decisões, é menos vulnerável a fraudes e está mais preparada para construir um futuro próspero. Neste artigo, defendemos a necessidade de integrar a educação financeira nos currículos escolares e de criar programas de formação para adultos, como um investimento estratégico no capital humano do país.</p>",
    author: "Sofia Ferreira",
    categories: ["Educação", "Opinião"],
    tags: ["Literacia Financeira", "Economia Pessoal"],
    published_at: "2025-09-11T18:00:00Z",
    cover_image_url: "https://picsum.photos/seed/blog4/800/600",
  },
];

export const events: Event[] = [
  {
    id: 1,
    title: "I Conferência Nacional: Banca Angolana & Desafios",
    slug: "conferencia-nacional-banca-2025",
    date: "02 DEZ",
    time: "08:00 - 17:00",
    location: "Hotel Epic Sana, Luanda",
    description: "Junte-se a nós para a primeira conferência nacional dedicada aos desafios e oportunidades do setor bancário angolano. Um dia inteiro de painéis de discussão com os principais líderes do setor, reguladores e inovadores. Temas em destaque: transformação digital, regulação, cibersegurança e o futuro do financiamento em Angola.",
    is_past: false,
    cover_image_url: "https://images.unsplash.com/photo-1556761175-b413da4b248d?auto=format&fit=crop&w=1920&q=80",
    banner_image_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80",
    gallery_images_urls: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: 250,
    attendees: 188
  },
  {
    id: 2,
    title: "Workshop: Compliance e Prevenção de Branqueamento de Capitais",
    slug: "workshop-compliance-pbc-2026",
    date: "15 JAN",
    time: "09:30 - 13:00",
    location: "Centro de Convenções de Talatona, Luanda",
    description: "Uma sessão intensiva e prática sobre as últimas atualizações regulatórias e as melhores práticas em matéria de compliance e Prevenção de Branqueamento de Capitais e Financiamento do Terrorismo (PBC/FT). Essencial para todos os profissionais de compliance, risco e auditoria.",
    is_past: false,
    cover_image_url: "https://images.unsplash.com/photo-1587825140708-df876c12b4ce?auto=format&fit=crop&w=1920&q=80",
    gallery_images_urls: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
    ],
    capacity: 75,
    attendees: 45
  },
  {
    id: 3,
    title: "Fintech Angola Summit 2026",
    slug: "fintech-angola-summit-2026",
    date: "22 FEV",
    time: "09:00 - 18:00",
    location: "Online / Virtual",
    description: "O maior evento online sobre tecnologia financeira em Angola está de volta. Conecte-se com startups, investidores, bancos e reguladores para discutir o futuro do setor. A agenda inclui demos de startups, mesas redondas sobre Open Banking e o impacto da IA nas finanças.",
    is_past: false,
    cover_image_url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1920&q=80",
    gallery_images_urls: [],
    capacity: 1000,
    attendees: 752
  },
  {
    id: 4,
    title: "Fórum de Investimento e Mercado de Capitais",
    slug: "forum-investimento-mercado-capitais-2026",
    date: "18 MAR",
    time: "10:00 - 16:00",
    location: "BODIVA, Luanda",
    description: "Um dia dedicado à análise das oportunidades de investimento no mercado de capitais angolano. Com a presença de gestores de ativos, analistas de mercado e representantes da BODIVA, este fórum é imperdível para quem quer compreender e participar no crescimento do mercado de ações e obrigações em Angola.",
    is_past: false,
    cover_image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80",
    gallery_images_urls: [
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80"
    ],
    capacity: 120,
    attendees: 115
  },
  {
    id: 5,
    title: "Webinar: O Impacto da IA na Banca",
    slug: "webinar-ia-banca-2025",
    date: "25 AGO",
    time: "15:00 - 16:30",
    location: "Online",
    description: "Análise aprofundada sobre como a Inteligência Artificial está a transformar a análise de risco, o atendimento ao cliente e a eficiência operacional nos bancos. Este webinar contou com a participação de especialistas nacionais e internacionais que partilharam casos de uso e tendências futuras.",
    is_past: true,
    cover_image_url: "https://images.unsplash.com/photo-1620712943543-95fc6962a3a6?auto=format&fit=crop&w=1920&q=80",
    gallery_images_urls: [],
    capacity: 500,
    attendees: 431
  },
];

export const sponsors: Sponsor[] = [
  {
    id: 1,
    name: "Banco Angolano de Investimentos",
    logo_url: "https://www.bancobai.ao/media/2584/logo-bai.svg",
    url: "https://www.bancobai.ao",
  },
  {
    id: 2,
    name: "Banco de Fomento Angola",
    logo_url: "https://www.bfa.ao/images/logos/logo-mobile.svg",
    url: "https://www.bfa.ao",
  },
  {
    id: 3,
    name: "Standard Bank Angola",
    logo_url: "data:image/webp;base64,UklGRmoXAABXRUJQVlA4IF4XAABwZACdASrQALQAPp1KnkslpCKhp3XJ8LATiU0I1bKwoXJufteX/6cGXvYNHl/q3n58CcExZAQ/EF/pf3foQP8B+gHuZ+wb+jX+O/jX9V987bZn915p/XrmqHEAHst+jX+789r6s/Mn5s3pl3p70RumZ/xlqneh/w3fH+reV58V96OV/6yu53++7pn+m9n2E51moD+sPnCTp/zbUA40f0T2A/575zmoP6r9hTpM/u37MH7gMOgy9yDy6fexLTesLtHYPIesddezwkhgJyJ0+jwIprivxnHATS06QL4hr/Lh3ggpK1WXwTk2CJ7g2KQzW0zTk+dyS/4dyv0p/xGVuBoQSHRKiDboQIe+yV7A3l13JdwrY7jkIfjULOchfSHXSeqb4o8diwWWBKYNiXT4oI1gPznAUfkq1Hj9mxWCY2OKnHC1QOVN0BXaAJYaBie9shJrhSPOD9GxpZrpPwEJthBwcCMGrQob2/ZoAjSTxZ/Fw3tnTzP8QbEY67mub43iOqxjZ0N+yvm9JsMtDb4gWCszpAsNbyVGnDVvqNkXmt9to0ilGxoXYws3AzIcm0lsXL185sLNNc8P6iYKeqRdCrB4PnYW3LQeC2J2Znb8IOXNDq7zt3XEVDs2gQwYOB7EHSoVY2/cNIHY675w3NweximhIDJm/3I5qH0k0KLLe35C5N4yldPJ2jKQ6sE3Vx4IwffTKsnDlma8/6GpxzyyTbnmqUw8e/clLYo3ePYXJq21qOgaO9p3v9F+At0kriViSkYSwysPqag9g2GvXmqnMGyx6JKEnMtYFX/DwN0HRAU60k4PFnlTrNd2FnhF7gwa8tWDGp3DXUJl1zUFNycnHvhvsXMjNx7azhHokaArwSZ7oTHw725h+LyekUqdfrSJ7MLSHQc9SzDUIFpzH75+Jhd+fxi80pPS1sS6khde7nYT8GTcJL3vJDuhmxPdtldeR7QQmM7c89FxYr6QBFA6DRrXUiwr57ms7fUREsfCJ5oigbVZx6aaoTXgoCzeKkKJ8Cc9/FMOzRTekjlNVTrDrhUSoi7RTHWaM6b/yLeqK5Ti5QIYkgPpQhC9JsQ6AAD++8qArhvFgnwbfKmEIH6sCysZRZtK9fNdeq6AKrHW+megTtH8AHfvHxqJe6AyhhUHc7nb2PR/2nqR3IKOCliqpVMZiknV2e6YCoLJ2B8K8IvqjVnWZ4+Y4RWgsw4jf/BTAXdMZ2u19eRknnNOvsZ4rv4yEPujX04HyqXHd3NnqHH9p1YJ0iDOSP0EoUqi+nyUhJVD+uyF2nW+y1D+crpEIw+FzMyfvPlXOX4gI0zNWaxm6Gd7zTo+Eu+EwIZlyhmQXKXb6sZPuUgwXZ9wKJRUdNO6LcfA2Pl51PDP/uFc8noOcoCWbUypc9h7DqoQFXH0zEeXwH0URhJSlDgJOAU0xPfy+NP3f/MnMp5LnZ07CYQAQzl1tArTKLNpV7WWx2hDp3FkOHlMN6Yy4AZu9dO8orQWYcTRNJsCuOy48xX3br/C28/KF7bNXGv1bkAcBdilkusFkCP4VajvloY8sxJ1r9baoAUNUuUf0TbgF6HxTKkoCddC8oY6uYZD9Gszz3w8/6cnAbn2L788iJ/8H8b+eKQ6fkq4qtIdKzW0LwsFb9GV1NMyhbrjudMu/6AmJLpyVTLOQy3nF1riDL1qHz4a+D2wOebb0A13dw7bGIKqwzgcolNUFY2Yw4MRTSVM+li4Vi9xrL36henG7fOT+iug8a/wkgq1iFAOuovb98cJeHItRb9toIlU7wZ5Z5aD4lHCIpXsOu8tBqaLm0qKb92Rmpg+eTdrbyN7aLjYSW0wbCdcrTFx93EHcAaZ7AloxrYcXEAc8AdpJkbvbL9d9iac707qmENx4LGESbzMEafM3l+7S0A/J9QxYBcyeElaabF/aTczacAoaunkSGwjrtiReRy/iNcwQHATYtUHIo9pPEQBuFqQ8tOmVzkIsGvIopfORyvCW/67Z4VzCV1wVA0hfSrdss7BFRTSBrjiEbThYQxmGgPfFbXoQJ/UPBsQghVmt0FL0U1nsoEiUQ419kH7olqfVf/trJFOsD7ejDZCMFLvF3nT9n54c2N1stcvp0TImzAOGdUnl+Zhk7G4n5ZOJaJAGXYyPy8RJ5QM1uKtv/99JC9uwQ/TlIOvg0HZV4au+fmlYC4j6H2qnB1JDtbgtlqoYEdKMH7g0wYBrke4tdzYF2/Ij9tQrA+RuS32EDFBl6MbVWY42laIny0Fnb1hgeYlAEXtBdlgxssCOZyUw+7pcPwPeb4Wf9wuuJXvVlJtThOYbP3FXQ9wfZ3AFA7AhibEOOOHvTsxj2XXmCKFuhJ+Hb4kSas9hP3A9l/Ee9oB/NrB9V+y+pCvfer7h8NWuPzLGkktEN2Qc3v2l/xNfv9CZtBcwWDWVeu8sZAGFl22YJQdzoOii3cKrSeKdd05qVJXSdJtzZKzGkN+LbvGQi6TFWNl7bNYvlQzxrgEolAEX9YbfERdhn4CfcCyIZ+hy+rCYCF5i493sTxTxZQ4d/SBPhSWnU1DOskSUcfztuOJ1+Aeu54uPlnkZ8fSSHP31lfREC/aXl0H46RM+AwHvB4JJHvJi3PmCe3uxdyTL/W4G0KjAzS7Gpcd5lbOhwU3xzddm/M9FXHwPYsp+Q6fdAPSEpeAJV8Vgf7Jcg5sO+7I54bL2ctSWTvu7OeErrJyUqcSM4oBLt6hK8EwP7IK6n51FYiodERTB1G+0B64YYGHkzD7jOfVaYPijIlSNBsD53eKKDw4WaUyKkQmaokSSRaAEOk4iZqNCQ2JQrY3kOpYUpC5tmO5uvPUk61olsxY2gkdZqiwFAW7LIw4jh9AmvrYR2PcLCysPDyIrH0ngH8Pkc5hb3w6VHlUQSTHCUxnv7N6GrTwDW46NARTmcxZ9F4YEx7+Bfghd4l8DlDORfya9ynehNXeWPpSopmnDyEE1+m89CZawDkESXRKcbo2h8fm8z3nGmgoUelp9Y47vT3WupjbVzOQmtraW4MAQWGyO2bxJXEmuQLyCWIkbItOJQ7teaVjF7bdt8DcNuphpe0WcynEAlOn/37dHX+YHdBZe9QqM49skgVHTB7aZIdZ/c6eKEv1GKYoVe+0CiHuxRiAd56vQ4KU1nYi6NEXDhlYiRCF2qerJWFxDP3b8YMGekGS+paHRUX+9MS5l8iARFmg43wsSa8K9xY6OVVP3odLRqIjR9jO8Y9tlLYB+npS2upq6M3l2lJeUKmGD3CWWCdAL2S82LnpC5wlmYT8/62zJ4vHCxwary6LiGZ/MJeBs6i0zzsTPcU9aX2d+AZPELGJtQVM/LZBOFl8H2E0lB+LdVI++Z4B/6ns/lb2SYCOSi33nnqLUojgiRND6iT+6KDdGLpf9z8MlTb2nbnbRKLi45dY8RTCD1v3nM+5eTJAblDiHbCckml+nDtDbIOIUhQ3RdGTe1Q0IZsEWv8+tzP7xfJlU9p+78GDwYeydooS1CNyobebIoLRtP1FS8sn5g0Ddl3KT0fLhx1k1yTAq/ImaPtywWyX1GyJnbHMv/9qQsD77bjmtya7r4dLT0XlUILt2NyAnM6LLN+3hzZ+JuP9UVWm96H8gh/AD5Kj2fX6ZuuvMFdlD7UaNMUWPUus6vFpPnnyPM00yKMjpBPDJKavGFWAuotzgPJyxA/IYL7/RBuBdnQlqxcMJtJr70JEaRCMQdbVYGtujlADeqKeZueCeesxeNt5fLE0cwrcmzsOZsAAH1GNHctFYCUHZlvVoP6dn429DXo4CzruNGiKUKExhjQygDSt4iTGRFLiApLQn2s14Lyr8RI5ztOTzeywwVYAw9fkDAhyaDnBGhLP1VtMgemxfE2XGfxIT7RdGz5SXQmqGBS/9+uTIzC9TfUwnI9o79Mr58oSsDUCVWqQtmHitc2wx2I3FjszqgiTicZDSvhTwEUekUAIfXOcAVZ3AXyolrPWVihJm70eGbj8SWJIsGMRCDM5YR1eA2/k7bn+rjF0ERgXaHoMyrpDxpaoiNoBi/Rd1iWEGsl9PCp/EHkTLQg6ZkfW/q9FZT4vAz/Uc+StuHvQJJemJe+iTsbxlN9ouxqSfygaqBSA60xqyjo0PBiFmpFhp2RXeSit/WjE9EzZm2A8Co+1PAIZPHlz9EPZ3TH1X2JYtjDkRPR4/cC3hYbrlQWwqy53G07pZNDgKnS0he9OGpXve5cNB1ko+DJ3Faq4AqEKfwL4/UE7r6M4LVmIin/y4CIbPFqYT6bkv8KzQ5Pu67nmcbUWwS84D1Dn2DD3272zVfU+kmiZI3VnsXiq9e84ctTlvbC/tTvMsNpvIxroan7Ziifutau2xheHXTfP1OiH/gIQ+3mAUBlBaoJXcULaM9HWQkAkmVvyQJfytzbcATIQzRlM0UdMQR9sv1x7TjXfhx+fXD8oWyB1b0ZdjJGRpihd9ebabM3NBs5QeP9u8QFbpTxp8R858r6abMYlxv/ZE/LC5d4gJO0ss9tKnXKFUnvirQqcCGQkPbNlo68hMMUMZqmbSuwosLJzJhQgqtdT9IYWem/tQEoOA5bGeP450wZDM0tRcilFUB0s1CZVX53Cy+PAL3kLHqbMPKzXpR02ZclwMrEpIyoxMh1B0OvJMGxUgNLasr5OTT3PcQwEMyLR0dFaL59Ias+hE+69JcoL07KvzPDMcqJ5LlmLFR8096plwyRCeen5Fl0H5h8NS6vA9HcCgGEX7YeC34J8uPVK/N+eRsw5P9yrBx+aeerFFKzVPeeIUPCdIKhz8HOXUjBYPXFZAwK71Lsr7x5GM6h8HySTnuJYpMZk3vXMJ8XiGAsYAVVrjSs5tPhmrXa+9iSrC/rS1kFCFNaYpBUkOzWovITAwnqP8CvV9i1QzDePUeH6jsvE4Vmqjx/l7SAzOJkMY8NUBBKZIptF0urqxKMI/wf7tzPNx72axdmvM/tfGH6MUlqYo6o/NSlGxts8y0MBkK1LSnYet7AebTQd/1g/xlBSzRiX+E7UFhqRdmdmagiem/Oh/O6DVEyQHA0DVitmlwxfzvRR4abffUKi5jMlaEU9tMga7VTmOhlBtUWrFVvIiK1ld5IGnoBQkkEJPHtFaLbWV5rKz1NYyggr/jgr19FwoNpAjka3sk8+ix2EjBL0Li4NhE8ctldH+7yEmB0I5YvzoDE/u0mlLFbJS19cVrtL9vBPvGtZ7lWS77dkzqFvt0dih6TA82xnDT8+R7OR6CaZQj6Q/74XN9/YeeCCXkAU5/+uwXBTBYq2oJkFQ+XtHsiDXlj5dALIPsgUK36OteiHjvc3j7zaK3FVHe9/PswNTlpqDQP5lDYeKo23y3sRgssDXFr19+Gb8sslKqb9TsIIPN2GZIYHXy+C9kPbRauSk5+Tg/1zbz/kHVGVWGH+mV44T0+7Lm7VfmMiFHxbrZdcpgNmApKVbsVCgmWpoGrYPwSRnRWgqOcezJ8U9eT5DznU8uCmCxVtgIs5ATpxr6g52MN22/2yFX5+SjN/qlHuuDyx+oi69pFazO1+ZMxH2nTJ9gxB/9CTcTetXzOa8Rt8dgDwlI7k2DU+2gwEz+sPlNLYOSXiXiC4TTPq7PqDjHUE7CpeNafzI4tdazC53Q51c8v2hjBmmWjlhzq6CERCV9ZRIPgXhe/VDC0zJXjiIBoRaL9XJBbit7GpDfHfBNQ/j6WlN+pi+Pd7rvvmqayOFw+9+bOeTil5aqww7cLSHH2SQUucH5FIqEO88bgPVsmzdTujDAo2SjlprhMz15W5iRGkUGtMJNw9kpDUmOVuyg6QrPn8Qs+bFU2E+TmL1N1+RL9FMWvPJ5c7Xk03gHagvHYzQu/AYifcJR5FflyxMvvYpkxP9TY/34QwyyB0rziP3DvFVIqaFzaB4Fqq9dlr6StktSG+X8aZaFNnLeu1n5+uGbbEofcMbm23f3TsS9A1fePXA8i3cCftAu7cIfm3T1yIxcZn+cTr7v4LPmVgX6YFCHChCJ6xdzv0GN3VvP1r+D89d2ZrC/D+dkgw5Pn1d81cYNc1EVWbgOLv0GdKJwpz7FibLjnqQpHozEMzdNuROtWGb9VfMYFlUdwXgC7gUVpx5AXlsS/OU+zmp+U1VwJW9A7LdfDE8X0xDhV11zoGjGUaU8YlpOc3k2Tg/O6SO8ShsoxL7bvqUWa/Vi4KrvKJ03qUmZkj1WLy+o3COGTlfJ9e0fYGwVuyh38QcutueYhbtQE69hxKdOeI6ucCEBW0WVAe96CqD/Y2Qrv0AUgGGfJ4vuajszKrC091fpKC2oYpzIAEueftgUxCD8o/eiFCf+QNkHg2T6x3a1Zvl178sY6HsDhk2bbfEHwouwk/v/6LqH60ck1DXU7xFef6DTIDst18Sk/aYakk42PmuZfV/ViTvFaVPy5cxmnrseQPlZKAS+yVzRUxNrPp7L9IvgPlocvbpIPWjEnxJtj/Mohb5lioUsVNyri59RD8rYfD4a6MHtC66Nl8v/JjCJeHWUCJ33kTHhaZvwleHGQ4zeyXP8z2fKcDw1lM8Oe7KcjW9j7oXvtjG5omFf54Gg1n56uhVfgunXm5S2B9kTRjarKXKvUfPOdNIe6eb5IXpZ9tvNpXsFz5wL3otAuQEKs036Y2iUbiS6bzxM1TFx5Y8DV8/4jnr0cFrEDmL5njCtmUkgxvfYg68rUD2vdPfzhqfHqlKeuxvZLxFLfwbSSQA94muKrc8pEev027L26OeTNO1VBvz6QYW+R/CKpRw/VX/n82KbtFio1ADWwGZNJELtq89Sr36okM/DyWaHxM1XAnNhQHTZE0whmRfik6AoXmGLFGbnvI4Rb39C+LP/7gYubzebr4sMFF21q3hVsuyrH4takt9tPKWF9qOQZmKGn9/2nf45pF4kvTiW3/9vfg4H2XGQ6gSNowSuMlwtwTTD2rWuALIQ+wjaJJnG8LkwEfiGQPY2odHX60vsefK1Kc/zBJA/DtHNr3/a0n9hkppncUY4uOxz8nbkEoNdrF7npikcLkmfrsrKA2Ym/TzR3FexvYSPMhMUKq0Q/f0q+yMSmDpKTciQ6znEhtgf+W8Fds7brr+MenkaIVXpaPUtzXKID5Tf3uqctvH5A+lFRioPgVh/dg/+b2Esr/WW7lhu8cROcWBQUd1WovdX5fhNkGZia4tRDAZFdALIU9Evb37GoSryU3BmuH3AVJuTR75NrAluXn3rWQW8vuSA/Ou5t26++Zzi7QJe3KtkOP9Rb5IcQrw1aUJFr5x4Y0Vxlhateew1TMGxc0McsiA5OHbHKiaEWXcCC2pmkhLdbFCSFeEeUnZ4snv+KqBJt57LLiUSddE95B8sKRqZ+a8sAaj99Zb+FBB/Sc/n82Ka6qi744OSp1kbX5PLqkM09Wgcdhwzsr3Cz9+c5gMyPteVZG/nwOLLOvmlB/GVabY6iBqzSnPT+s6U3HXsSenLQj1SgFwbt65pI0vB5pSl5E8aaEjDjlQRYRX3eSvUVvml/WjepIxS4eP9oVI0WxaeEZKnWk2Cm41mo4vOJeVmr5LbZd2etB6tvzBW/JfGgUQMm0PKD3bMeyJW28dPae3QQzOSI+M+QRcc6vegabrsSpGYanvXksWtXpBE1TJvwswmz+1wNqfjTTrMX8mRhpbfcIbIm6z9UfGe5kfDMw/GYReRveFVjs3OqO49S2dahQNGuRTtWXX/xTRozCZujnzjt06Fw4h5Gn7FfM5nP9YLz4mnOJPeTPXIBRJRsNTjL402ZRHYnDjP5PysKYYvP/JJyOPaFqy2DnB5aiWzDBUcLKwiMpFoXgBeg6D3nJwHe8tOerTi5rS0YzQqVfXFQ5NM0ltIBYyIeTOPytpRrQhoA4pNHm+/zhMWJZdp2A9rEHdCGGGEskACssCP5wK+FSFpzEZjsC3bU7twzFDYBAIzD0sfnX8Jel1ecFRDKjKiOf/Bsfv7//ggCOS4UCbMeRR4BcGru4IOLOcESsP/YAAAA=",
    url: "https://www.standardbank.co.ao",
  },
  {
    id: 4,
    name: "PwC Angola",
    logo_url: "https://th.bing.com/th/id/R.54b93a22cf41e4f0b2bd5f64986bb724?rik=SLXvLsr7n6uBWg&pid=ImgRaw&r=0",
    url: "https://www.pwc.com/ao",
  },
  {
    id: 5,
    name: "Deloitte Angola",
    logo_url: "https://www.deloitte.com/content/dam/assets-shared/logos/svg/a-d/deloitte.svg",
    url: "https://www2.deloitte.com/ao",
  },
  {
    id: 6,
    name: "Unitel",
    logo_url: "https://unitel.ao/wp-content/uploads/share_upload/2023/11/logo.svg",
    url: "https://www.unitel.ao/",
  },
];
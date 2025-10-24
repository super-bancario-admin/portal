// Firebase Admin SDK Initialization Script (Bypasses Security Rules)
// Run this in Node.js environment with: node initFirestore.js

import admin from 'firebase-admin';

// Firebase Admin configuration
// Note: Admin SDK requires service account credentials
const serviceAccount = {
  projectId: "ser-bancario-live",
  // For Admin SDK, we need a service account key
  // This script will guide you to get it
};

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "ser-bancario-live"
  });
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK');
  console.error('\n📖 To use the Admin SDK, you need to:');
  console.error('   1. Go to: https://console.firebase.google.com/project/ser-bancario-live/settings/serviceaccounts/adminsdk');
  console.error('   2. Click "Generate new private key"');
  console.error('   3. Download the JSON file');
  console.error('   4. Set environment variable: GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json');
  console.error('\n💡 Alternative: Temporarily enable test mode in Firestore Rules (see instructions below)');
  process.exit(1);
}

const db = admin.firestore();

// --- Permissions ---
const getPermissionsForRole = (role) => {
  const basePermissions = {
    manageAdmins: false,
    manageManagers: false,
    manageBloggers: false,
    fullNewsCRUD: false,
    fullBlogCRUD: false,
    viewAllAnalytics: false,
    viewLimitedAnalytics: false,
    createContent: false,
    crudOwnContent: false,
  };

  switch (role) {
    case 'Super Admin':
      return {
        ...basePermissions,
        manageAdmins: true,
        manageManagers: true,
        manageBloggers: true,
        fullNewsCRUD: true,
        fullBlogCRUD: true,
        viewAllAnalytics: true,
        createContent: true,
      };
    case 'Admin':
      return {
        ...basePermissions,
        manageManagers: true,
        manageBloggers: true,
        fullNewsCRUD: true,
        fullBlogCRUD: true,
        viewAllAnalytics: true,
        createContent: true,
      };
    case 'Manager':
      return {
        ...basePermissions,
        fullNewsCRUD: true,
        fullBlogCRUD: true,
        viewLimitedAnalytics: true,
        createContent: true,
      };
    case 'Blogger':
      return {
        ...basePermissions,
        viewLimitedAnalytics: true,
        createContent: true,
        crudOwnContent: true,
      };
    default:
      return basePermissions;
  }
};

// --- Data ---
const users = [
  { uid: '1', username: 'superadmin', email: 'super@serbancario.ao', passwordHash: 'super123', role: 'Super Admin', permissions: getPermissionsForRole('Super Admin') },
  { uid: '2', username: 'admin', email: 'admin@serbancario.ao', passwordHash: 'admin123', role: 'Admin', permissions: getPermissionsForRole('Admin') },
  { uid: '3', username: 'manager', email: 'manager@serbancario.ao', passwordHash: 'manager123', role: 'Manager', permissions: getPermissionsForRole('Manager') },
  { uid: '4', username: 'blogger', email: 'blogger@serbancario.ao', passwordHash: 'blogger123', role: 'Blogger', permissions: getPermissionsForRole('Blogger') },
];

const articles = [
  {
    id: '1',
    type: 'news',
    title: 'BNA Anuncia Novas Medidas para Fortalecer o Kwanza',
    slug: 'bna-anuncia-novas-medidas-kwanza',
    excerpt: 'O Banco Nacional de Angola (BNA) introduziu um novo pacote de políticas monetárias com o objetivo de estabilizar a taxa de câmbio e combater a inflação.',
    body: '<p>Num comunicado oficial, o BNA detalhou as novas regras para a venda de divisas aos bancos comerciais, que visam aumentar a transparência e a eficiência no mercado cambial. Analistas do setor esperam que estas medidas tragam maior previsibilidade para as empresas e para os cidadãos.</p><p>As novas políticas incluem também um ligeiro aumento da taxa de juro de referência, sinalizando um compromisso do banco central em controlar a subida de preços. O governador do BNA, José de Lima Massano, afirmou em conferência de imprensa que "estas são decisões difíceis, mas necessárias para garantir a estabilidade macroeconómica do país a longo prazo".</p>',
    author: 'Equipa Ser Bancário',
    categories: ['Regulação', 'Política Monetária'],
    tags: ['BNA', 'Kwanza', 'Inflação'],
    published_at: '2024-07-22T09:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_featured: true,
  },
  {
    id: '2',
    type: 'news',
    title: 'Bancos Angolanos Investem em Transformação Digital',
    slug: 'bancos-angolanos-investem-transformacao-digital',
    excerpt: 'Os principais bancos comerciais de Angola estão a acelerar os seus investimentos em tecnologia para modernizar serviços e melhorar a experiência do cliente.',
    body: '<p>A corrida pela digitalização no setor bancário angolano intensificou-se, com instituições como o Banco Angolano de Investimentos (BAI) e o Banco de Fomento Angola (BFA) a lançarem novas aplicações móveis e plataformas de internet banking. O foco está em oferecer serviços mais convenientes, seguros e acessíveis, desde a abertura de contas online até à solicitação de crédito digital.</p>',
    author: 'Ana Monteiro',
    categories: ['Inovação', 'Tecnologia'],
    tags: ['Digitalização', 'Banca Digital', 'Fintech'],
    published_at: '2024-07-21T14:30:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    type: 'news',
    title: 'Mercado de Seguros em Angola Apresenta Crescimento Sólido',
    slug: 'mercado-seguros-crescimento-solido',
    excerpt: 'O setor de seguros em Angola registou um crescimento de 12% no primeiro semestre de 2024, impulsionado pelos seguros de saúde e automóvel.',
    body: '<p>Segundo dados da Agência Angolana de Regulação e Supervisão de Seguros (ARSEG), o volume de prémios de seguro atingiu um novo recorde. Este crescimento reflete uma maior consciencialização da população para a importância da proteção financeira e uma maior oferta de produtos por parte das seguradoras.</p>',
    author: 'Equipa Ser Bancário',
    categories: ['Mercados', 'Seguros'],
    tags: ['ARSEG', 'Crescimento Económico'],
    published_at: '2024-07-20T11:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    type: 'blog',
    title: 'Análise: O Futuro do Open Banking em Angola',
    slug: 'analise-futuro-open-banking-angola',
    excerpt: 'O conceito de Open Banking promete revolucionar o setor financeiro global. Quais são as oportunidades e os desafios para a sua implementação em Angola?',
    body: '<p>O Open Banking, que permite o compartilhamento seguro de dados financeiros entre instituições através de APIs, tem o potencial de criar um ecossistema financeiro mais competitivo e inovador. Para Angola, isto poderia significar o surgimento de novas fintechs, produtos financeiros mais personalizados e uma maior inclusão financeira.</p><p>No entanto, os desafios são significativos. É necessária uma regulamentação clara por parte do BNA, investimentos robustos em cibersegurança por parte dos bancos e, crucialmente, a construção de confiança junto do consumidor. Este artigo explora o caminho a percorrer para que Angola possa colher os frutos desta nova era da banca.</p>',
    author: 'blogger',
    categories: ['Opinião', 'Fintech'],
    tags: ['Open Banking', 'Inovação', 'Regulação'],
    published_at: '2024-07-19T10:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    is_featured: true,
  },
  {
    id: '5',
    type: 'blog',
    title: 'ESG: A Nova Fronteira para a Banca Angolana',
    slug: 'esg-nova-fronteira-banca-angolana',
    excerpt: 'Os critérios Ambientais, Sociais e de Governança (ESG) estão a tornar-se um pilar central para investidores globais. Como pode o setor bancário angolano adaptar-se e liderar esta transição?',
    body: '<p>A integração de práticas ESG na estratégia dos bancos já não é uma opção, mas uma necessidade. Desde o financiamento de projetos de energia renovável até à promoção da diversidade e inclusão nas suas equipas, os bancos têm um papel fundamental na promoção de um desenvolvimento económico sustentável. Analisamos os primeiros passos que estão a ser dados em Angola e as oportunidades que surgem para as instituições que abraçarem a agenda ESG.</p>',
    author: 'Carla Neves',
    categories: ['Sustentabilidade', 'Análise'],
    tags: ['ESG', 'Investimento Sustentável', 'Governança'],
    published_at: '2024-07-15T16:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const events = [
  {
    id: '1',
    title: 'Conferência Anual de Banca Digital e Inovação',
    slug: 'conferencia-banca-digital-2024',
    date: '15 AGO',
    time: '09:00 - 17:00',
    location: 'Hotel Talatona, Luanda',
    description: 'Junte-se aos líderes do setor financeiro para debater as últimas tendências em tecnologia, inovação e o futuro da banca em Angola. Uma oportunidade única de networking e aprendizagem.',
    is_past: false,
    cover_image_url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    banner_image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery_images_urls: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1521737852577-684897f092a3?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    capacity: 200,
    attendees: 112,
  },
  {
    id: '2',
    title: 'Workshop: Gestão de Risco e Compliance no Setor Financeiro',
    slug: 'workshop-gestao-risco-compliance',
    date: '25 SET',
    time: '14:00 - 18:00',
    location: 'Online (Zoom)',
    description: 'Um workshop intensivo focado nas melhores práticas de gestão de risco e nos desafios de compliance que os bancos angolanos enfrentam no cenário atual.',
    is_past: false,
    cover_image_url: 'https://images.unsplash.com/photo-1587825140708-df876c1d3df1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery_images_urls: [],
    capacity: 75,
    attendees: 34,
  },
  {
    id: '3',
    title: 'Fórum de Mercados de Capitais de Angola',
    slug: 'forum-mercados-capitais-2024',
    date: '10 JUN',
    time: 'Todo o dia',
    location: 'BODIVA, Luanda',
    description: 'Um evento histórico que reuniu reguladores, investidores e empresas para discutir o futuro do mercado de capitais em Angola.',
    is_past: true,
    cover_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery_images_urls: [],
    capacity: 150,
    attendees: 150,
  },
];

const sponsors = [
  { id: '1', name: 'Banco Angolano de Investimentos', logo_url: 'https://media.licdn.com/dms/image/D4D0BAQG79iVi6I0l_g/company-logo_200_200/0/1690559981313/banco_bai_logo?e=2147483647&v=beta&t=S_g7iY-Sg1-sQdZ_7rJ0hLzQy_Y8fW4tD5kC3wX1Z5I', url: 'https://www.bancobai.ao' },
  { id: '2', name: 'Standard Bank Angola', logo_url: 'https://media.licdn.com/dms/image/C4D0BAQHgPve7m-jHjA/company-logo_200_200/0/1631333333306?e=2147483647&v=beta&t=K_y8F_Q5X_Y9xR8jZ8e3sL6c3wJ4fW2xX8z_7aF6c3w', url: 'https://www.standardbank.co.ao' },
  { id: '3', name: 'Banco de Fomento Angola', logo_url: 'https://media.licdn.com/dms/image/C4D0BAQF3Q_qj5L_Z7w/company-logo_200_200/0/1630654311021/banco_de_fomento_angola_bfa_logo?e=2147483647&v=beta&t=O_2iX8yG8p_wZ7hY_3gD9kX_5yW4oH_9jA_2iX8yG8p', url: 'https://www.bfa.ao' },
  { id: '4', name: 'Unitel', logo_url: 'https://media.licdn.com/dms/image/C4D0BAQG3Q_qj5L_Z7w/company-logo_200_200/0/1630654311021/unitel_logo?e=2147483647&v=beta&t=A_1bX8yG8p_wZ7hY_3gD9kX_5yW4oH_9jA_2iX8yG8p', url: 'https://www.unitel.ao' },
  { id: '5', name: 'PwC Angola', logo_url: 'https://media.licdn.com/dms/image/C4D0BAQF_qj5L_Z7w/company-logo_200_200/0/1630654311021/pwc_angola_logo?e=2147483647&v=beta&t=B_1cX8yG8p_wZ7hY_3gD9kX_5yW4oH_9jA_2iX8yG8p', url: 'https://www.pwc.co.ao' },
  { id: '6', name: 'Deloitte Angola', logo_url: 'https://media.licdn.com/dms/image/C4D0BAQG_qj5L_Z7w/company-logo_200_200/0/1630654311021/deloitte_angola_logo?e=2147483647&v=beta&t=C_1dX8yG8p_wZ7hY_3gD9kX_5yW4oH_9jA_2iX8yG8p', url: 'https://www2.deloitte.com/ao/pt.html' },
];

const activityLog = [
  { id: '1', timestamp: '2024-07-23T10:05:00Z', user: 'admin', action: 'LOGIN', details: 'Login bem-sucedido a partir de 192.168.1.1' },
  { id: '2', timestamp: '2024-07-23T10:15:23Z', user: 'manager', action: 'CREATE_ARTICLE', details: 'Criou a notícia: "Mercado de Seguros em Angola Apresenta Crescimento Sólido"' },
  { id: '3', timestamp: '2024-07-23T11:30:10Z', user: 'blogger', action: 'UPDATE_ARTICLE', details: 'Atualizou o rascunho do blog: "ESG: A Nova Fronteira..."' },
  { id: '4', timestamp: '2024-07-23T14:00:55Z', user: 'superadmin', action: 'CREATE_USER', details: 'Criou o utilizador "blogger" com a função Blogger.' },
  { id: '5', timestamp: '2024-07-23T15:12:41Z', user: 'admin', action: 'DELETE_EVENT', details: 'Apagou o evento "Webinar: Cibersegurança Financeira" (ID: 4)' },
];

// --- Initialize Firestore ---
async function initializeFirestore() {
  try {
    console.log('🚀 Starting Firestore initialization with Admin SDK...\n');
    console.log('ℹ️  Admin SDK bypasses security rules for administrative tasks.\n');

    // Initialize Users Collection
    console.log('📝 Creating "users" collection and adding documents...');
    for (const user of users) {
      await db.collection('users').doc(user.uid).set(user);
      console.log(`  ✓ Added user: ${user.username} (${user.role})`);
    }
    console.log('  ✅ Users collection created successfully!');

    // Initialize Articles Collection
    console.log('\n📰 Creating "articles" collection and adding documents...');
    for (const article of articles) {
      await db.collection('articles').doc(article.id).set(article);
      console.log(`  ✓ Added article: ${article.title} (${article.type})`);
    }
    console.log('  ✅ Articles collection created successfully!');

    // Initialize Events Collection
    console.log('\n📅 Creating "events" collection and adding documents...');
    for (const event of events) {
      await db.collection('events').doc(event.id).set(event);
      console.log(`  ✓ Added event: ${event.title}`);
    }
    console.log('  ✅ Events collection created successfully!');

    // Initialize Sponsors Collection
    console.log('\n🤝 Creating "sponsors" collection and adding documents...');
    for (const sponsor of sponsors) {
      await db.collection('sponsors').doc(sponsor.id).set(sponsor);
      console.log(`  ✓ Added sponsor: ${sponsor.name}`);
    }
    console.log('  ✅ Sponsors collection created successfully!');

    // Initialize Activity Log Collection
    console.log('\n📊 Creating "activity_logs" collection and adding documents...');
    for (const log of activityLog) {
      await db.collection('activity_logs').doc(log.id).set(log);
      console.log(`  ✓ Added log entry: ${log.action} by ${log.user}`);
    }
    console.log('  ✅ Activity logs collection created successfully!');

    console.log('\n' + '='.repeat(60));
    console.log('✅ FIRESTORE INITIALIZATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📋 Summary of Collections Created:');
    console.log(`  1. users ..................... ${users.length} documents`);
    console.log(`  2. articles .................. ${articles.length} documents`);
    console.log(`  3. events .................... ${events.length} documents`);
    console.log(`  4. sponsors .................. ${sponsors.length} documents`);
    console.log(`  5. activity_logs ............. ${activityLog.length} documents`);
    console.log('\n💡 You can now view these collections in your Firebase Console:');
    console.log('   https://console.firebase.google.com/project/ser-bancario-live/firestore');
    
  } catch (error) {
    console.error('\n❌ Error initializing Firestore:', error);
    console.error('\n🔍 Possible issues:');
    console.error('   - Check your internet connection');
    console.error('   - Verify service account credentials');
    console.error('   - Ensure Firestore is enabled in Firebase Console');
    throw error;
  }
}

// Run the initialization
initializeFirestore()
  .then(() => {
    console.log('\n🎉 All done! Your Firestore database is ready.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
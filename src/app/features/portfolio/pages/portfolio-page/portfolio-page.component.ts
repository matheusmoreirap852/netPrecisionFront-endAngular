import { Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMessageFacade } from '../../data-access/contact-message-facade.service';

@Component({
  selector: 'app-portfolio-page',
  imports: [FormsModule],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent {
  readonly accessSystem = output<void>();
  readonly menuOpen = signal(false);
  readonly language = signal<'pt' | 'en'>('pt');
  readonly content = computed(() => portfolioContent[this.language()]);
  readonly name = signal('');
  readonly email = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  constructor(readonly contactMessageFacade: ContactMessageFacade) {}

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLanguage(): void {
    this.language.update((language) => (language === 'pt' ? 'en' : 'pt'));
    this.closeMenu();
  }

  sendMessage(): void {
    this.contactMessageFacade.send(
      {
        name: this.name(),
        email: this.email(),
        subject: this.subject(),
        message: this.message(),
      },
      () => this.clearForm(),
    );
  }

  private clearForm(): void {
    this.name.set('');
    this.email.set('');
    this.subject.set('');
    this.message.set('');
  }
}

const portfolioContent = {
  pt: {
    navigation: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      resume: 'Currículo',
      contact: 'Contato',
      system: 'Acessar sistema',
      languageLabel: 'English version',
      languageButton: 'EN',
    },
    hero: {
      eyebrow: 'Full-Stack Software Engineer',
      title: 'Matheus Moreira Pessoa',
      copy:
        'Desenvolvo e sustento sistemas corporativos para setor público e grandes empresas, atuando da regra de negócio à publicação em produção. Minha base começou em front-end, suporte e infraestrutura, evoluiu para C#, .NET, Java, Angular, dados, integrações, cloud e soluções com impacto real em operação.',
      cases: 'Ver estudos de caso',
      resume: 'Baixar currículo',
      system: 'Acessar sistema',
      stats: [
        ['2016', 'Início profissional em tecnologia'],
        ['Experiência multissetorial', 'Governo, educação e ambiente corporativo'],
        ['Full stack', 'Front-end, back-end, dados, cloud e operação'],
      ],
      profile:
        'Atuação prática em APIs REST, OutSystems, integrações, Oracle, SQL Server, Docker, GitHub Actions, AWS EC2, BI, logs e sustentação de produção.',
    },
    about: {
      eyebrow: 'Sobre',
      title: 'Engenharia de software com visão de produto, operação e negócio.',
      heading: 'Resumo profissional',
      paragraphs: [
        'Atuo no ciclo completo de software: levantamento, desenho da solução, implementação, testes, publicação, monitoramento e evolução. Minha experiência une desenvolvimento, suporte, infraestrutura, banco de dados e relacionamento com usuários, o que ajuda a construir sistemas mais simples de operar e manter.',
        'Nos últimos anos trabalhei com sistemas públicos, licitação, gestão documental, educação, torneios, BI, integrações corporativas e ambientes com Scrum, dailies, documentação, esteiras e suporte à produção.',
      ],
      contact: 'Contato',
      focus: [
        ['Produto', 'Entendimento do problema, priorização, organização e acompanhamento de entregas.'],
        ['Engenharia', 'APIs, front-end, regras de negócio, integrações, testes e evolução técnica.'],
        ['Operação', 'Publicação, logs, diagnóstico de erros, banco de dados, cloud e suporte.'],
      ],
    },
    experience: {
      eyebrow: 'Experiência',
      title: 'Linha do tempo profissional até a atuação atual.',
      items: [
        ['Atual', 'Jun 2026 - atual', 'Argo Inteligência Digital', 'Engenheiro de Software', 'Evolução e sustentação de soluções utilizadas pela Prefeitura de Goiânia, com análise de regras, integrações, testes, entregas e aproximação entre engenharia, gestão pública, IA e dados.'],
        ['PJ sob demanda', 'Out 2025 - Jun 2026', 'Óticas Brasil', 'Software Engineer | atuação PJ paralela', 'Sistema web integrado a Oracle e PL/SQL, com apoio em migração para AWS EC2, automações, consultas analíticas e organização de repositório no GitHub.'],
        ['Corporativo', 'Jan 2024 - Jun 2026', 'Tata Consultancy Services | Petrobras', 'Analista de Sistemas Pleno | Software Engineer', 'Atuação remota em times corporativos com OutSystems, Java, documentação, reuniões técnicas, Microsoft Graph API, SharePoint REST, AWS S3 e gestão documental.'],
        ['Freelancer', 'Mar 2025 - Jun 2025', 'Sorigue | Playroll Spain', 'Tech Lead Freelancer | projeto internacional de curta duração', 'Apoio em arquitetura, organização técnica, microsserviços .NET, Azure, testes automatizados, CI/CD e comunicação técnica em espanhol e inglês.'],
        ['Produto', 'Jul 2022 - Fev 2024', 'Senac Goiás', 'Analista de Sistemas de TI', 'Desenvolvimento de sistemas, banco, publicação, diagnóstico de erros e melhoria contínua. Criei o sistema Copa Sesc e trabalhei junto de infraestrutura, DBA, DevOps, gerência e gestores.'],
        ['Setor público', '2020 - 2022', 'Estado de Goiás | SEDI | Cast Group', 'OutSystems, C#, licitação e Scrum', 'Sustentação e evolução de sistemas públicos estaduais com regras de licitação, processos complexos, dailies, planejamento, documentação e organização de atividades.'],
        ['Base', '2016 - 2021', 'Propaganda, PUC Goiás, Ortobom e Oi', 'Front-end, suporte, redes e control desk', 'Primeiro contato profissional em agência de propaganda, formação em Análise e Desenvolvimento de Sistemas pela PUC Goiás, suporte na Ortobom e organização de filas e chamados na Oi.'],
      ],
    },
    cases: {
      eyebrow: 'Estudos de caso',
      title: 'Projetos reais apresentados pelo problema, solução e resultado.',
      labels: ['Problema', 'Responsabilidade', 'Solução', 'Tecnologias'],
      items: [
        {
          tag: 'Setor público',
          title: 'Portal de Dados de Goiânia',
          details: [
            'Organizar dados públicos e regras de negócio em um ambiente confiável para consulta e evolução.',
            'Sustentação, análise de requisitos, correções, integrações e apoio à entrega técnica.',
            'Aplicações corporativas com back-end, front-end, banco de dados, documentação e acompanhamento ágil.',
            'C#, OutSystems, SQL, integrações, Scrum e sistemas públicos.',
          ],
          result: 'Resultado: centralização da consulta de dados públicos e padronização da navegação entre indicadores, painéis e publicações.',
        },
        {
          tag: 'Integrações',
          title: 'Gestão documental - Petrobras',
          details: [
            'Tratar documentos corporativos com segurança, controle, integração e rastreabilidade entre plataformas.',
            'Participação em time remoto, documentação, reuniões técnicas, manutenção e evolução de fluxos.',
            'Integrações com serviços Microsoft e armazenamento em cloud para apoiar processos documentais.',
            'OutSystems, Java, Microsoft Graph API, SharePoint REST e AWS S3.',
          ],
          result: 'Resultado: fluxo documental mais integrado, documentado e preparado para operação em ambiente corporativo distribuído.',
        },
        {
          tag: 'Produto completo',
          title: 'Copa Sesc - gestão de torneios',
          details: [
            'Centralizar a gestão de torneios, participantes, jogos e acompanhamento operacional do evento.',
            'Construção do sistema do zero, entendimento das regras, modelagem, telas, banco e publicação.',
            'Sistema web para apoiar a gestão completa do torneio junto às áreas envolvidas.',
            '.NET, SQL, procedures, logs, BI, esteiras e suporte à operação.',
          ],
          result: 'Resultado: digitalização do processo de torneios, reduzindo controle manual e facilitando o acompanhamento operacional.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Decisões técnicas',
      title: 'Como transformo experiência em engenharia prática.',
      copy:
        'Este portfólio também demonstra o Task Manager full stack: API REST, frontend Angular, autenticação, isolamento de tarefas por usuário, formulário público de mensagens, testes, Swagger, Nginx, Docker e publicação estática no GitHub Pages.',
      metrics: [
        ['DDD', 'Domínio separado de infraestrutura e interface.'],
        ['CI/CD', 'Build, testes, Docker e GitHub Pages.'],
        ['Cloud', 'Preparação para AWS EC2, Nginx e proxy de API.'],
      ],
      steps: [
        ['01. Domínio', 'Regra de negócio protegida', 'Entidades, value objects, factories e casos de uso para reduzir acoplamento em controllers.'],
        ['02. API', 'Contrato REST e persistência', 'Spring Boot, JPA, validações, tratamento global de erros e Swagger para leitura rápida do contrato.'],
        ['03. Interface', 'Angular com fluxo claro', 'Componentes, signals, facade, services HTTP e separação entre portfólio público e área logada.'],
        ['04. Publicação', 'Docker, Nginx e Pages', 'Execução local com Docker Compose e publicação do portfólio como vitrine pública no GitHub Pages.'],
      ],
    },
    resume: {
      eyebrow: 'Currículo',
      title: 'Competências principais, formação e download em PDF.',
      skills: [
        ['01', 'Full Stack', 'C#, .NET, ASP.NET Core, React, Angular, Java, Spring Boot, TypeScript, APIs REST e integrações.'],
        ['02', 'Dados e cloud', 'Oracle, SQL Server, Supabase, PL/SQL, Python, BI, Amazon S3, AWS EC2, Docker e Kubernetes.'],
        ['03', 'Arquitetura', 'Clean Code, SOLID, DDD, Arquitetura Limpa, microsserviços, segurança, testes e CI/CD.'],
      ],
      downloadTitle: 'Currículo em PDF',
      downloadCopy: 'Resumo objetivo para recrutadores, com competências, trajetória e contatos principais.',
      downloadButton: 'Baixar currículo em PDF',
      downloadFile: 'curriculo-matheus-pessoa.pdf',
      educationTitle: 'Formação',
      education: [
        'PUC Goiás - Análise e Desenvolvimento de Sistemas, 2018 a 2021',
        'Inglês em desenvolvimento - curso de nível B1 em andamento',
        'UFG - Especialização lato sensu em Inteligência Artificial e Ciência de Dados para a Gestão Pública, início planejado',
      ],
      practicesLabel: 'Tecnologias e práticas',
      practices: ['Domain-Driven Design', 'APIs REST', 'Microsserviços', 'Docker', 'CI/CD', 'SQL', 'Cloud', 'Testes automatizados'],
    },
    code: {
      eyebrow: 'Código fonte',
      title: 'Repositórios do projeto',
      links: [
        ['Backend', 'netPrecisionBack-End', 'API Spring Boot com autenticação, tarefas, mensagens, Swagger e testes.'],
        ['Frontend', 'netPrecisionFront-endAngular', 'Angular com portfólio, login, cadastro, área logada e integração com a API.'],
        ['Perfil', 'GitHub Matheus Pessoa', 'Outros estudos, evoluções e projetos publicados.'],
      ],
    },
    message: {
      eyebrow: 'Contato',
      title: 'Fale comigo sobre código, produto ou oportunidades.',
      name: 'Nome',
      email: 'Email',
      subject: 'Assunto',
      text: 'Mensagem',
      sending: 'Enviando...',
      send: 'Enviar mensagem',
    },
  },
  en: {
    navigation: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      resume: 'Resume',
      contact: 'Contact',
      system: 'Open system',
      languageLabel: 'Versão em português',
      languageButton: 'PT',
    },
    hero: {
      eyebrow: 'Full-Stack Software Engineer',
      title: 'Matheus Moreira Pessoa',
      copy:
        'I build and maintain enterprise systems for public sector and large-company environments, working from business rules to production deployment. My foundation started with front-end, support and infrastructure, then evolved into C#, .NET, Java, Angular, data, integrations, cloud and operationally useful solutions.',
      cases: 'View case studies',
      resume: 'Download resume',
      system: 'Open system',
      stats: [
        ['2016', 'Professional start in technology'],
        ['Multi-sector experience', 'Government, education and enterprise environments'],
        ['Full stack', 'Front-end, back-end, data, cloud and operations'],
      ],
      profile:
        'Hands-on work with REST APIs, OutSystems, integrations, Oracle, SQL Server, Docker, GitHub Actions, AWS EC2, BI, logs and production support.',
    },
    about: {
      eyebrow: 'About',
      title: 'Software engineering with product, operations and business context.',
      heading: 'Professional summary',
      paragraphs: [
        'I work across the full software lifecycle: discovery, solution design, implementation, testing, deployment, monitoring and continuous evolution. My background combines development, support, infrastructure, databases and user-facing work, which helps me build systems that are easier to operate and maintain.',
        'In recent years I have worked with public-sector systems, procurement rules, document management, education, tournament management, BI, corporate integrations and teams using Scrum, dailies, documentation, pipelines and production support.',
      ],
      contact: 'Contact',
      focus: [
        ['Product', 'Problem understanding, prioritization, organization and delivery tracking.'],
        ['Engineering', 'APIs, front-end, business rules, integrations, tests and technical evolution.'],
        ['Operations', 'Deployments, logs, error diagnosis, databases, cloud and support.'],
      ],
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Professional timeline up to my current role.',
      items: [
        ['Current', 'Jun 2026 - present', 'Argo Inteligência Digital', 'Software Engineer', 'Evolution and support of solutions used by Goiânia City Hall, covering business rules, integrations, tests, deliveries and the connection between engineering, public management, AI and data.'],
        ['On-demand PJ', 'Oct 2025 - Jun 2026', 'Óticas Brasil', 'Software Engineer | parallel PJ engagement', 'Web system integrated with Oracle and PL/SQL, supporting AWS EC2 migration, automation, analytical queries and GitHub repository organization.'],
        ['Enterprise', 'Jan 2024 - Jun 2026', 'Tata Consultancy Services | Petrobras', 'Mid-level Systems Analyst | Software Engineer', 'Remote work in enterprise teams with OutSystems, Java, documentation, technical meetings, Microsoft Graph API, SharePoint REST, AWS S3 and document management.'],
        ['Freelance', 'Mar 2025 - Jun 2025', 'Sorigue | Playroll Spain', 'Freelance Tech Lead | short-term international project', 'Support in architecture, technical organization, .NET microservices, Azure, automated tests, CI/CD and technical communication in Spanish and English.'],
        ['Product', 'Jul 2022 - Feb 2024', 'Senac Goiás', 'IT Systems Analyst', 'Systems development, database work, deployments, error diagnosis and continuous improvement. I built the Copa Sesc system and worked closely with infrastructure, DBA, DevOps, management and business stakeholders.'],
        ['Public sector', '2020 - 2022', 'State of Goiás | SEDI | Cast Group', 'OutSystems, C#, procurement rules and Scrum', 'Support and evolution of state public-sector systems with procurement rules, complex processes, dailies, planning, documentation and task organization.'],
        ['Foundation', '2016 - 2021', 'Advertising, PUC Goiás, Ortobom and Oi', 'Front-end, support, networks and control desk', 'First professional contact in an advertising agency, degree in Systems Analysis and Development at PUC Goiás, technical support at Ortobom and ticket queue/rule organization at Oi.'],
      ],
    },
    cases: {
      eyebrow: 'Case studies',
      title: 'Real projects presented through problem, ownership, solution and outcome.',
      labels: ['Problem', 'Ownership', 'Solution', 'Technologies'],
      items: [
        {
          tag: 'Public sector',
          title: 'Goiânia Data Portal',
          details: [
            'Organize public data and business rules in a reliable environment for consultation and evolution.',
            'Support, requirements analysis, fixes, integrations and technical delivery assistance.',
            'Enterprise applications with back-end, front-end, databases, documentation and agile delivery tracking.',
            'C#, OutSystems, SQL, integrations, Scrum and public-sector systems.',
          ],
          result: 'Outcome: centralized public-data consultation and standardized navigation across indicators, dashboards and publications.',
        },
        {
          tag: 'Integrations',
          title: 'Document management - Petrobras',
          details: [
            'Handle corporate documents with security, control, integration and traceability across platforms.',
            'Remote team participation, documentation, technical meetings, maintenance and flow evolution.',
            'Integrations with Microsoft services and cloud storage to support document processes.',
            'OutSystems, Java, Microsoft Graph API, SharePoint REST and AWS S3.',
          ],
          result: 'Outcome: a more integrated and documented document flow prepared for distributed enterprise operations.',
        },
        {
          tag: 'Complete product',
          title: 'Copa Sesc - tournament management',
          details: [
            'Centralize tournament management, participants, matches and operational event tracking.',
            'Built the system from scratch, covering rules, modeling, screens, database and deployment.',
            'Web system to support complete tournament management together with the involved teams.',
            '.NET, SQL, procedures, logs, BI, pipelines and operations support.',
          ],
          result: 'Outcome: tournament operations moved into a digital process, reducing manual controls and improving operational tracking.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Technical decisions',
      title: 'How I turn experience into practical engineering.',
      copy:
        'This portfolio also demonstrates the full-stack Task Manager: REST API, Angular frontend, authentication, user-scoped tasks, public contact form, tests, Swagger, Nginx, Docker and static publishing on GitHub Pages.',
      metrics: [
        ['DDD', 'Domain separated from infrastructure and interface.'],
        ['CI/CD', 'Build, tests, Docker and GitHub Pages.'],
        ['Cloud', 'Preparation for AWS EC2, Nginx and API proxying.'],
      ],
      steps: [
        ['01. Domain', 'Protected business rules', 'Entities, value objects, factories and use cases to reduce coupling in controllers.'],
        ['02. API', 'REST contract and persistence', 'Spring Boot, JPA, validations, global error handling and Swagger for quick contract reading.'],
        ['03. Interface', 'Clear Angular flow', 'Components, signals, facade, HTTP services and separation between public portfolio and logged-in area.'],
        ['04. Deployment', 'Docker, Nginx and Pages', 'Local execution with Docker Compose and portfolio publishing as a public showcase on GitHub Pages.'],
      ],
    },
    resume: {
      eyebrow: 'Resume',
      title: 'Core skills, education and PDF download.',
      skills: [
        ['01', 'Full Stack', 'C#, .NET, ASP.NET Core, React, Angular, Java, Spring Boot, TypeScript, REST APIs and integrations.'],
        ['02', 'Data and cloud', 'Oracle, SQL Server, Supabase, PL/SQL, Python, BI, Amazon S3, AWS EC2, Docker and Kubernetes.'],
        ['03', 'Architecture', 'Clean Code, SOLID, DDD, Clean Architecture, microservices, security, tests and CI/CD.'],
      ],
      downloadTitle: 'Resume PDF',
      downloadCopy: 'Objective summary for recruiters, with key skills, timeline and contact information.',
      downloadButton: 'Download resume PDF',
      downloadFile: 'resume-matheus-pessoa.pdf',
      educationTitle: 'Education',
      education: [
        'PUC Goiás - Systems Analysis and Development, 2018 to 2021',
        'English in development - B1-level course in progress',
        'UFG - Postgraduate specialization in Artificial Intelligence and Data Science for Public Management, planned start',
      ],
      practicesLabel: 'Technologies and practices',
      practices: ['Domain-Driven Design', 'REST APIs', 'Microservices', 'Docker', 'CI/CD', 'SQL', 'Cloud', 'Automated tests'],
    },
    code: {
      eyebrow: 'Source code',
      title: 'Project repositories',
      links: [
        ['Backend', 'netPrecisionBack-End', 'Spring Boot API with authentication, tasks, messages, Swagger and tests.'],
        ['Frontend', 'netPrecisionFront-endAngular', 'Angular with portfolio, login, sign-up, logged-in area and API integration.'],
        ['Profile', 'Matheus Pessoa GitHub', 'Other studies, improvements and published projects.'],
      ],
    },
    message: {
      eyebrow: 'Contact',
      title: 'Contact me about code, product or opportunities.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      text: 'Message',
      sending: 'Sending...',
      send: 'Send message',
    },
  },
} as const;

import { createContext, useContext, useState } from 'react'

// Alle vaste teksten van de site, per taal.
// Wil je iets aanpassen of toevoegen? Doe dat hier op één plek.
const translations = {
  nl: {
    nav: { home: 'Home', projects: 'Projecten', about: 'About', contact: 'Contact' },
    hero: {
      titlePre: 'Ik ben ',
      titlePost: ', ICT-student & ondernemer',
      subtitle:
        "School is voor mij de startbaan, niet de bestemming. Ik gebruik elke skill die ik leer meteen om m'n eigen bedrijven groter te maken. Tegen de tijd dat ik klaar ben met studeren, draaien ze al jaren.",
      projectsBtn: 'Bekijk projecten',
      aboutBtn: 'Meer over mij',
    },
    projects: { title: 'Geselecteerde Projecten' },
    contact: {
      title: 'Laten we samenwerken',
      intro:
        'Heb je een project in gedachten of wil je gewoon sparren? Stuur me een berichtje en ik kom zo snel mogelijk bij je terug.',
      nameLabel: 'Naam',
      namePlaceholder: 'Je naam',
      emailLabel: 'E-mail',
      emailPlaceholder: 'je@email.com',
      messageLabel: 'Bericht',
      messagePlaceholder: 'Vertel me over je plannen...',
      submit: 'Verzend bericht',
      location: 'Nederland',
    },
    footer: { copy: '© 2026 David Mateman. Gebouwd met technische precisie.' },
  },
  en: {
    nav: { home: 'Home', projects: 'Projects', about: 'About', contact: 'Contact' },
    hero: {
      titlePre: "I'm ",
      titlePost: ', IT student & entrepreneur',
      subtitle:
        "For me school is the runway, not the destination. I put every skill I learn straight to work growing my own companies. By the time I graduate, they'll already have been running for years.",
      projectsBtn: 'View projects',
      aboutBtn: 'More about me',
    },
    projects: { title: 'Selected Projects' },
    contact: {
      title: "Let's work together",
      intro:
        "Got a project in mind or just want to spar? Drop me a message and I'll get back to you as soon as possible.",
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your plans...',
      submit: 'Send message',
      location: 'Netherlands',
    },
    footer: { copy: '© 2026 David Mateman. Built with technical precision.' },
  },
}

// De context: een "kanaal" waardoor de gekozen taal door de hele app stroomt.
const LanguageContext = createContext(null)

// De Provider zet je één keer om je app heen (in main.jsx).
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('nl')

  const toggleLang = () => setLang((prev) => (prev === 'nl' ? 'en' : 'nl'))

  // t = de teksten van de HUIDIGE taal
  const value = { lang, toggleLang, t: translations[lang] }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Kleine hulp-hook zodat een component makkelijk bij de taal kan.
export function useLanguage() {
  return useContext(LanguageContext)
}

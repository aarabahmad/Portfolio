import React from 'react';
import './index.css';

import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import CodingProfiles from './components/CodingProfiles';
import Badges from './components/Badges';
import Skills from './components/Skills';
import Chatbot from './components/Chatbot';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <div className="app">
      <Helmet>
        <title>Aarab Ahmad | Machine Learning Engineer</title>
        <meta name="description" content="Portfolio of Aarab Ahmad, a software engineer specializing in building scalable machine learning models and AI-driven solutions." />
        <meta property="og:title" content="Aarab Ahmad Portfolio" />
        <meta property="og:description" content="Machine Learning Engineer specializing in artificial intelligence and scalable data pipelines." />
        <meta property="og:type" content="website" />
      </Helmet>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Achievements />
        <CodingProfiles />
        <Badges />
        <Chatbot />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;

// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Skills from '../components/Skills';
import ProjectsList from './ProjectsList';
import Research from './Research';
import Contact from './Contact';

const Home = () => {
    return (
        <div>
            <Hero />
            <TechMarquee />
            <About />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Education />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <ProjectsList />
            <div className="section-divider" />
            <Research />
            <div className="section-divider" />
            <Contact />
        </div>
    );
};

export default Home;
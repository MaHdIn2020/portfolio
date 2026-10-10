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
            <Experience />
            <Education />
            <Skills />
            <ProjectsList />
            <Research />
            <Contact />
        </div>
    );
};

export default Home;
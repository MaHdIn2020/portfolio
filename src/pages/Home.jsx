import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import About from './About';
import Contact from './Contact';
import ProjectsList from './ProjectsList';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Skills></Skills>
            <ProjectsList></ProjectsList>
            <About></About>
            <Contact></Contact>
        </div>
    );
};

export default Home;
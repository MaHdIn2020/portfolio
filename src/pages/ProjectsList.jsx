import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
const ProjectsList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = [
  {
    id: 1,
    name: "Match Finder",
    image: "/match-finder.jpeg",
    description: "A matrimonial website connecting users based on preferences.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://match-finder-2c918.web.app/",
    githubClient: "https://github.com/MaHdIn2020/MatchFinder",
    challenges: "Making the site fully responsive and adding animations.",
    futurePlans: "Implementing user authentication and chat features.",
  },
  {
    id: 2,
    name: "HobbyHive",
    image: "/HobbyHive.jpeg",
    description: "Group buying platform for hobby enthusiasts with user reviews.",
    technologies: ["Node.js", "React.js", "MongoDB", "Express.js"],
    liveLink: "https://hobbyhive-d81af.web.app/",
    githubClient: "https://github.com/MaHdIn2020/hobbyhive",
    challenges: "handling user authentication and product reviews.",
    futurePlans: "Adding more hobby categories and improving the UI.",
  },
  {
    id: 3,
    name: "Review Hub",
    image: "/review-hub.jpeg",
    description: "Responsive review platform for products with user authentication.",
    technologies: ["Node.js", "React.js", "MongoDB", "Express.js"],
    liveLink: "https://review-hub-641bc.web.app/",
    githubClient: "https://github.com/MaHdIn2020/Review-Hub",
    challenges: "Adding review system and handling user authentication.",
    futurePlans: "Implement product recommendations and improve UI/UX.",
  },
];


  const closeDetails = () => setSelectedProject(null);

  return (
    <section id="projects" className="py-16 px-6 mx-auto bg-[#5C94FC]">
        <motion.h2
        className="text-3xl font-bold mb-12 text-[#E52521] pixel-text text-center drop-shadow-[3px_3px_0_#000]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={setSelectedProject}
          />
        ))}
      </div>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-start overflow-auto p-8 z-50 pt-20"
          onClick={closeDetails}
        >
          <div
            className="bg-white pixel-border max-w-4xl w-full p-8 relative text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black text-white px-3 py-1 pixel-border hover:bg-[#E52521] pixel-text"
              onClick={closeDetails}
              aria-label="Close project details"
            >
              X
            </button>

            <h3 className="text-2xl font-bold text-[#E52521] mb-4 pixel-text drop-shadow-[2px_2px_0_#FBD000]">
              {selectedProject.name}
            </h3>

            <img
              src={selectedProject.image}
              alt={`${selectedProject.name} screenshot`}
              className="mb-8 object-cover max-h-[400px] w-full pixel-border"
            />

            <p className="mb-4 font-semibold text-lg">
              <strong className="text-black pixel-text text-sm block mb-1">Description:</strong>
              {selectedProject.description}
            </p>

            <p className="mb-4 font-semibold text-lg">
              <strong className="text-black pixel-text text-sm block mb-1">Main Technologies:</strong>
              {selectedProject.technologies.join(", ")}
            </p>

            <p className="mb-4 font-semibold text-lg">
              <strong className="text-black pixel-text text-sm block mb-1">Challenges Faced:</strong>
              {selectedProject.challenges}
            </p>

            <p className="mb-8 font-semibold text-lg">
              <strong className="text-black pixel-text text-sm block mb-1">Improvements & Future Plans:</strong>
              {selectedProject.futurePlans}
            </p>

            <div className="flex flex-wrap gap-4">
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mario-button bg-[#43B047] hover:bg-green-600 text-sm"
                >
                  Start Game (Live)
                </a>
              )}
              {selectedProject.githubClient && (
                <a
                  href={selectedProject.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mario-button bg-gray-600 hover:bg-gray-800 text-sm"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsList;

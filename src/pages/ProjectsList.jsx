import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
const ProjectsList = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = [
  {
    id: 1,
    name: "Match Finder",
    image: "../../public/match-finder.jpeg",
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
    image: "../../public/HobbyHive.jpeg",
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
    image: "../../public/review-hub.jpeg",
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
    <section id="projects" className="py-16 px-6  mx-auto bg-black">
        <motion.h2
        className="text-3xl font-bold mb-12 text-indigo-400 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-start overflow-auto p-8 z-50"
          onClick={closeDetails}
        >
          <div
            className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full p-8 relative text-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold"
              onClick={closeDetails}
              aria-label="Close project details"
            >
              &times;
            </button>

            <h3 className="text-4xl font-bold text-indigo-400 mb-4">
              {selectedProject.name}
            </h3>

            <img
              src={selectedProject.image}
              alt={`${selectedProject.name} screenshot`}
              className="rounded-md mb-6 object-cover max-h-96 w-full"
            />

            <p className="mb-4">
              <strong className="text-white">Description:</strong>{" "}
              {selectedProject.description}
            </p>

            <p className="mb-4">
              <strong className="text-white">Main Technologies:</strong>{" "}
              {selectedProject.technologies.join(", ")}
            </p>

            <p className="mb-4">
              <strong className="text-white">Challenges Faced:</strong>{" "}
              {selectedProject.challenges}
            </p>

            <p className="mb-6">
              <strong className="text-white">Improvements & Future Plans:</strong>{" "}
              {selectedProject.futurePlans}
            </p>

            <div className="flex flex-wrap gap-4">
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition"
                >
                  Live Project
                </a>
              )}
              {selectedProject.githubClient && (
                <a
                  href={selectedProject.githubClient}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-semibold transition"
                >
                  GitHub (Client)
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

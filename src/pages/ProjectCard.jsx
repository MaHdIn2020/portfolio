import { motion } from "framer-motion";

const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99,102,241,0.5)" }}
    >
      <div className="h-48 md:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} Screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-3">{project.name}</h3>
        <button
          onClick={() => onViewDetails(project)}
          className="mt-auto self-start px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition-colors duration-300 shadow-md"
          aria-label={`View more details about ${project.name}`}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

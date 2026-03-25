import { motion } from "framer-motion";

const ProjectCard = ({ project, onViewDetails }) => {
  return (
    <motion.div
      className="bg-white pixel-border flex flex-col hover:-translate-y-2 transition-transform cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onViewDetails(project)}
    >
      <div className="h-48 md:h-56 overflow-hidden border-b-4 border-black border-dashed">
        <img
          src={project.image}
          alt={`${project.name} Screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow items-center">
        <h3 className="text-lg font-bold text-black mb-4 pixel-text text-center leading-snug h-12 flex items-center justify-center">{project.name}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(project);
          }}
          className="mario-button mt-auto text-xs w-full"
          aria-label={`View more details about ${project.name}`}
        >
          View Level
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

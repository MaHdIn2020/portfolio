import { useState } from "react";
import { motion } from "framer-motion";

const AdminGate = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "mario" || password === "Tanjip") {
      onSuccess();
    } else {
      setError("Incorrect password!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100] p-4">
      <motion.div
        className="bg-[#141519] border-t-4 border-[#F47521] p-6 max-w-sm w-full text-white relative shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-2 text-white">Admin Access</h3>
        <p className="text-sm text-gray-400 mb-6">
          Only Tanjip can add to the "Watched" list. Please enter the password.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#23252b] text-white p-3 outline-none focus:ring-1 focus:ring-[#F47521] transition-shadow placeholder-gray-500"
            placeholder="Password..."
            autoFocus
          />
          {error && <p className="text-[#E52521] text-xs font-semibold">{error}</p>}
          <button
            type="submit"
            className="bg-[#F47521] hover:bg-[#d95f36] text-white font-bold py-3 px-4 uppercase tracking-widest text-sm mt-2 transition-colors"
          >
            LOG IN
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminGate;

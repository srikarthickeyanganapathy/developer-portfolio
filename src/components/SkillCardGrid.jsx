import { motion } from 'framer-motion';
import TiltCard from './ui/TiltCard';
import PropTypes from 'prop-types';

export default function SkillCardGrid({ skills }) {
  return (
    <div className="skills-grid space-y-4">
      {skills.map((group, index) => {
        return (
          <motion.div 
            key={group.category}
            className="skill-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
          >
            <TiltCard intensity={0.1} maxTilt={8} className="w-full">
              <div className="w-full rounded-xl glass-panel glass-hover p-6 transition-colors duration-500">
                <div className="mb-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--warm-dim)]">
                    {group.category}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="glass-chip px-3 py-1.5 text-[11px] text-[var(--warm-white)]/90 rounded-full font-medium font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        );
      })}
    </div>
  );
}

SkillCardGrid.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

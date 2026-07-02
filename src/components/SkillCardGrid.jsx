import TiltCard from './ui/TiltCard';
import PropTypes from 'prop-types';

export default function SkillCardGrid({ skills }) {
  return (
    <div
      className="skills-grid space-y-3 self-start max-h-[75vh] overflow-y-auto pr-2 -mr-2"
      style={{ transformStyle: "preserve-3d", scrollbarWidth: "thin" }}
    >
      {skills.map((group) => {
        return (
          // NOTE: initial rotateY(90deg)/opacity(0) state + the flip-in animation
          // are driven by AboutSection.jsx's GSAP dive timeline, which targets
          // this ".skill-card" class directly and scrubs it alongside the
          // pinned "dive in" scroll effect. Do not add a separate mount
          // animation here — it will fight the scrub.
          <div key={group.category} className="skill-card" style={{ transformStyle: "preserve-3d" }}>
            <TiltCard intensity={0.1} maxTilt={8} className="w-full">
              <div className="w-full rounded-xl glass-panel glass-hover p-5 transition-colors duration-500">
                <div className="mb-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--warm-dim)]">
                    {group.category}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const label = typeof item === "string" ? item : item.name;
                    const level = typeof item === "string" ? null : item.level; // 1-3
                    return (
                      <span
                        key={label}
                        className="glass-chip px-2.5 py-1 text-[10px] text-[var(--warm-white)]/90 rounded-full font-medium font-mono inline-flex items-center gap-1"
                      >
                        {label}
                        {level && (
                          <span className="inline-flex gap-[2px]" aria-hidden="true">
                            {[1, 2, 3].map((dot) => (
                              <span
                                key={dot}
                                className="w-[3px] h-[3px] rounded-full"
                                style={{
                                  background: dot <= level ? "var(--accent)" : "var(--warm-white)",
                                  opacity: dot <= level ? 1 : 0.15,
                                }}
                              />
                            ))}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </TiltCard>
          </div>
        );
      })}
    </div>
  );
}

SkillCardGrid.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ name: PropTypes.string.isRequired, level: PropTypes.number }),
        ])
      ).isRequired,
    })
  ).isRequired,
};
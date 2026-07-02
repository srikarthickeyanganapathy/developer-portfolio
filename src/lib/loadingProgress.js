const listeners = new Set();
const state = {
  checkpoints: {
    "terrain-geometry-built": false,
    "bird-mesh-first-frame": false,
  },
  progress: 0,
};

// Weight of each checkpoint
const WEIGHTS = {
  "terrain-geometry-built": 60, // 60%
  "bird-mesh-first-frame": 40,  // 40%
};

function calculateProgress() {
  let total = 0;
  for (const [key, fired] of Object.entries(state.checkpoints)) {
    if (fired) total += WEIGHTS[key] || 0;
  }
  return total;
}

export function reportCheckpoint(name) {
  if (state.checkpoints[name]) return;
  state.checkpoints[name] = true;
  
  state.progress = calculateProgress();
  listeners.forEach(fn => fn(state.progress, state.checkpoints));
}

export function subscribeProgress(fn) {
  listeners.add(fn);
  fn(state.progress, state.checkpoints);
  return () => listeners.delete(fn);
}

export function resetProgress() {
  state.checkpoints = {
    "terrain-geometry-built": false,
    "bird-mesh-first-frame": false,
  };
  state.progress = 0;
}

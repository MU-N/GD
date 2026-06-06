// Minimal external store to bridge the drei ScrollControls state (which only
// exists inside the Canvas) out to the fixed DOM nav rendered beside the Canvas.
// Avoids 60fps React re-renders: listeners only fire when the active index
// actually changes.
let state = { el: null, active: 0 };
const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

export const navStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },
  setEl(el) {
    if (state.el !== el) {
      state = { ...state, el };
      emit();
    }
  },
  setActive(active) {
    if (state.active !== active) {
      state = { ...state, active };
      emit();
    }
  },
};

const STORE_KEY = 'agf_wrestling_competitions_v1';
const DEFAULT_WEIGHTS = Array.from({ length: 51 }, (_, index) => index + 20);
const WEIGHT_RANGES = [
  { label: '20-29 kg', min: 20, max: 29 },
  { label: '30-39 kg', min: 30, max: 39 },
  { label: '40-49 kg', min: 40, max: 49 },
  { label: '50-59 kg', min: 50, max: 59 },
  { label: '60-70 kg', min: 60, max: 70 }
];
const ROUND_NAMES = ['1/32 final', '1/16 final', '1/8 final', '1/4 final', 'Yarımfinal', 'Final'];

export const state = {
  competitions: loadCompetitions(),
  currentId: null,
  tempWeights: [],
  availableWeights: [...DEFAULT_WEIGHTS],
  activeWeight: null,
  activeRoundIndex: 0,
  bracketView: 'grid',
  protocolView: 'flow',
  drawCard: null,
  screen: 'home',
  history: [],
  bracketEdit: false,
  draggedEntry: null,
  selectedEntry: null
};

export let pendingScoreFocus = null;
export let activeWeightRangeLabel = null;

export function loadCompetitions() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCompetitions() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state.competitions));
}

export function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function currentCompetition() {
  return state.competitions.find((item) => item.id === state.currentId) || null;
}

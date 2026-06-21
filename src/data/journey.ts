export interface JourneyPhase {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'active' | 'next' | 'future';
}

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    id: 'phase-1',
    phase: 'Phase 01',
    title: 'Launching in Jhajha',
    description: 'Our first city — proving the model, store by store, order by order.',
    status: 'active',
  },
  {
    id: 'phase-2',
    phase: 'Phase 02',
    title: 'Expanding across Bihar',
    description: 'Scaling the network to new cities, faster each time we launch.',
    status: 'next',
  },
  {
    id: 'phase-3',
    phase: 'Phase 03',
    title: 'Building across India',
    description: 'A delivery network built to reach every household, nationwide.',
    status: 'future',
  },
];

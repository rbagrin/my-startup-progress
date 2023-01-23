interface PhaseTable {
  id: string; // uuid
  name: string;
  description: string | null;
  completed: boolean;

  // previous phase - should use this to be able to keep the order of phase + add new phases in the middle of the list + reorder list of phases
  prev: string | null; 
  // next phase - same as 'prev'
  next: string | null;
}

interface TaskTable {
  id: string; // uuid
  description: string;
  completed: boolean;
  phaseId: string; // phase uuid
}

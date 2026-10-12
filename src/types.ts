export interface SubSystem {
  id: string;
  name: string;
}

export interface Fault {
  id: string;
  subSystem: string;
  message: string;
  lamp: string;
  effect: string;
  actions: string[];
  // Specific to Amrit Bharat Push-Pull Locomotive (Master vs Slave)
  masterEffect?: string;
  slaveEffect?: string;
  masterActions?: string[];
  slaveActions?: string[];
  nodeCode?: string;
}

export interface MarvelTeamPreset {
  name: string;
  hero: string;
  motto: string;
  insignia: 'arc_reactor' | 'cap_shield' | 'thor_hammer' | 'quantum_core';
}

export const MARVEL_AVENGERS_TEAMS: MarvelTeamPreset[] = [
  {
    name: 'Team Iron Legion',
    hero: 'Iron Man (Tony Stark)',
    motto: 'Autonomous Tactical Superiority',
    insignia: 'arc_reactor'
  },
  {
    name: 'Wakanda Vanguard',
    hero: 'Black Panther (T\'Challa)',
    motto: 'Wakanda Forever & Vibranium Tech',
    insignia: 'quantum_core'
  },
  {
    name: 'Asgardian Strike',
    hero: 'Thor Odinson',
    motto: 'Wielders of the Storm & Lightning',
    insignia: 'thor_hammer'
  },
  {
    name: 'Midnight Sons',
    hero: 'Doctor Strange',
    motto: 'Masters of the Mystic Arts',
    insignia: 'quantum_core'
  },
  {
    name: 'Quantum Avengers',
    hero: 'Ant-Man & The Wasp',
    motto: 'Subatomic Reality Protectors',
    insignia: 'quantum_core'
  },
  {
    name: 'S.H.I.E.L.D. Strike',
    hero: 'Captain America',
    motto: 'Defenders of Freedom & Protocol',
    insignia: 'cap_shield'
  },
  {
    name: 'Web Warriors',
    hero: 'Spider-Man (Peter Parker)',
    motto: 'With Great Power & Fast Agility',
    insignia: 'cap_shield'
  },
  {
    name: 'Guardians Fleet',
    hero: 'Rocket & Groot',
    motto: 'Cosmic Chaos & High Ordnance',
    insignia: 'arc_reactor'
  },
  {
    name: 'Stark Prototypes',
    hero: 'War Machine (James Rhodes)',
    motto: 'Precision Armor & Heavy Artillery',
    insignia: 'arc_reactor'
  },
  {
    name: 'Howling Commandos',
    hero: 'Winter Soldier (Bucky)',
    motto: 'Resilient Frontline Operatives',
    insignia: 'cap_shield'
  },
  {
    name: 'Illuminati Protocol',
    hero: 'Multiverse Thinkers',
    motto: 'Strategic Cosmic Council',
    insignia: 'quantum_core'
  },
  {
    name: 'Gamma Force',
    hero: 'The Incredible Hulk',
    motto: 'Unstoppable Kinetic Energy',
    insignia: 'thor_hammer'
  },
  {
    name: 'Nova Corps Squad',
    hero: 'Nova Prime',
    motto: 'Universal Cosmic Law & Order',
    insignia: 'quantum_core'
  },
  {
    name: 'X-Force Division',
    hero: 'Wolverine (Logan)',
    motto: 'Adamantium Will & Instinct',
    insignia: 'cap_shield'
  },
  {
    name: 'Champions of Bast',
    hero: 'Shuri',
    motto: 'Vibranium Science & Innovation',
    insignia: 'quantum_core'
  },
  {
    name: 'Thunderbolts Unit',
    hero: 'Hawkeye (Clint Barton)',
    motto: 'Never Miss a Marked Target',
    insignia: 'cap_shield'
  },
  {
    name: 'West Coast Avengers',
    hero: 'Hawkeye & Mockingbird',
    motto: 'California Multiverse Defense',
    insignia: 'cap_shield'
  },
  {
    name: 'Secret Avengers',
    hero: 'Black Widow (Natasha)',
    motto: 'Covert Black-Ops Reconnaissance',
    insignia: 'arc_reactor'
  },
  {
    name: 'A-Force Strike',
    hero: 'Captain Marvel & She-Hulk',
    motto: 'Unrivaled Heroic Might',
    insignia: 'quantum_core'
  },
  {
    name: 'Midnight Angels',
    hero: 'Dora Milaje Elite',
    motto: 'Peerless Royal Protectors',
    insignia: 'quantum_core'
  },
  {
    name: 'Damage Control Unit',
    hero: 'Stark Department',
    motto: 'Post-Battle Cleanup & Defense',
    insignia: 'arc_reactor'
  },
  {
    name: 'Kamar-Taj Sanctum',
    hero: 'Wong & Ancient Ones',
    motto: 'Guards of the Relics',
    insignia: 'quantum_core'
  },
  {
    name: 'Valkyrie Vanguard',
    hero: 'King Valkyrie',
    motto: 'New Asgard Royal Armada',
    insignia: 'thor_hammer'
  },
  {
    name: 'Scarlet Coven',
    hero: 'Scarlet Witch (Wanda)',
    motto: 'Chaos Magic & Reality Alteration',
    insignia: 'quantum_core'
  },
  {
    name: 'Ravagers Clan',
    hero: 'Yondu Udonta',
    motto: 'Yaka Arrow Cosmic Marauders',
    insignia: 'arc_reactor'
  },
  {
    name: 'Darkstar Operatives',
    hero: 'Red Guardian',
    motto: 'Iron Curtain Tactical Resilience',
    insignia: 'cap_shield'
  },
  {
    name: 'Vision Synthesis',
    hero: 'The Vision',
    motto: 'Synthezoid Computational Logic',
    insignia: 'arc_reactor'
  },
  {
    name: 'Falcon Wing Squadron',
    hero: 'Captain America (Sam Wilson)',
    motto: 'Supersonic Aerial Superiority',
    insignia: 'cap_shield'
  }
];

export const MARVEL_HERO_CALLSIGNS: string[] = [
  'Tony Stark',
  'Wanda Maximoff',
  'Peter Parker',
  'Steve Rogers',
  'Thor Odinson',
  'Natasha Romanoff',
  'Bruce Banner',
  'Stephen Strange',
  'Shuri of Wakanda',
  'Carol Danvers',
  'Sam Wilson',
  'Bucky Barnes',
  'Clint Barton',
  'Scott Lang',
  'Hope van Dyne',
  'James Rhodes',
  'Wong Sanctum',
  'Peggy Carter',
  'Nick Fury',
  'Loki Laufeyson'
];

export function getRandomHeroCallsign(): string {
  return MARVEL_HERO_CALLSIGNS[Math.floor(Math.random() * MARVEL_HERO_CALLSIGNS.length)];
}

export function getRandomMarvelTeams(count = 6, excludeNames: string[] = []): MarvelTeamPreset[] {
  const available = MARVEL_AVENGERS_TEAMS.filter(t => !excludeNames.includes(t.name));
  const pool = available.length >= count ? available : MARVEL_AVENGERS_TEAMS;
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

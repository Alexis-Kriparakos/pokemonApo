export const CHARMADER = {
  id: 4,
  name: 'charmander',
  battleStats: {
    atkStat: 167,
    defStat: 138,
    hpStat: 176,
    spAtkStat: 192,
    spDefStat: 175,
    speedStat: 195,
  },
  stats: {
    atkStat: 167,
    defStat: 138,
    hpStat: 176,
    spAtkStat: 192,
    spDefStat: 175,
    speedStat: 195,
  },
  isAlive: true,
  types: ['fire'],
  selectedMoves: [
    {
      id: 7,
      accuracy: 100,
      name: 'fire-punch',
      power: 75,
      type: { name: 'fire' },
    },
    {
      id: 52,
      accuracy: 100,
      name: 'ember',
      power: 40,
      type: { name: 'fire' },
    },
  ],
};

export const BULBASUAR = {
  id: 5,
  name: 'bulbasaur',
  battleStats: {
    atkStat: 157,
    defStat: 158,
    hpStat: 203,
    spAtkStat: 208,
    spDefStat: 228,
    speedStat: 135,
  },
  stats: {
    atkStat: 157,
    defStat: 158,
    hpStat: 203,
    spAtkStat: 208,
    spDefStat: 228,
    speedStat: 135,
  },
  isAlive: true,
  types: ['grass', 'poison'],
  selectedMoves: [
    {
      id: 22,
      accuracy: 100,
      name: 'vine-whip',
      power: 75,
      type: { name: 'grass' },
    },
    {
      id: 33,
      accuracy: 100,
      name: 'tackle',
      power: 40,
      type: { name: 'normal' },
    },
  ],
};

export default { CHARMADER, BULBASUAR };

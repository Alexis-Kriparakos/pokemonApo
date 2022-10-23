import { isEmpty } from 'lodash';
import { BehaviorSubject } from 'rxjs';

import jsonStorage from '../helpers/json-storage';

export const Trainer1Team = {
  subject: [],
  lazyInit: () => {
    if (!isEmpty(Trainer1Team.subject)) return Trainer1Team.subject;
    const storage = window.localStorage;
    const trainer1Team = jsonStorage.get('trainer1Team', { storage }) || [];

    Trainer1Team.subject = new BehaviorSubject(trainer1Team);
    return Trainer1Team.subject;
  },
  update: trainer1Team => {
    const _trainer1Team = Trainer1Team.lazyInit();
    _trainer1Team.next(trainer1Team);
    const storage = window.localStorage;
    jsonStorage.set('trainer1Team', trainer1Team, { storage });
  },
  getStartingPokemon: () => {
    const _trainer1Team = Trainer1Team.lazyInit();
    return _trainer1Team.value[0];
  },
  subscribe: trainer1Team => {
    const _trainer1Team = Trainer1Team.lazyInit();
    return _trainer1Team.subscribe(trainer1Team);
  },
  getValue: () => {
    const _trainer1Team = Trainer1Team.lazyInit();
    return _trainer1Team.value;
  },
};

export const Trainer2Team = {
  subject: [],
  lazyInit: () => {
    if (!isEmpty(Trainer2Team.subject)) return Trainer2Team.subject;
    const storage = window.localStorage;
    const trainer2Team = jsonStorage.get('trainer2Team', { storage }) || [];

    Trainer2Team.subject = new BehaviorSubject(trainer2Team);
    return Trainer2Team.subject;
  },
  update: trainer2Team => {
    const _trainer2Team = Trainer2Team.lazyInit();
    _trainer2Team.next(trainer2Team);
    const storage = window.localStorage;
    jsonStorage.set('trainer2Team', trainer2Team, { storage });
  },
  getStartingPokemon: () => {
    const _trainer2Team = Trainer2Team.lazyInit();
    return _trainer2Team.value[0];
  },
  subscribe: trainer2Team => {
    const _trainer2Team = Trainer2Team.lazyInit();
    return _trainer2Team.subscribe(trainer2Team);
  },
  getValue: () => {
    const _trainer2Team = Trainer2Team.lazyInit();
    return _trainer2Team.value;
  },
};

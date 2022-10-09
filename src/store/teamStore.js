import { BehaviorSubject } from 'rxjs';

const trainer1Team$ = new BehaviorSubject([]);
const trainer2Team$ = new BehaviorSubject([]);

export const Trainer1Team = {
  update: (trainer1Team) => {
    trainer1Team$.next(trainer1Team);
  },
  getStartingPokemon: (trainer2Team) => trainer2Team[0],
  subscribe: (trainer1Team) => trainer1Team$.subscribe(trainer1Team),
  getValue: () => trainer1Team$.value,
};

export const Trainer2Team = {
  update: (trainer2Team) => {
    trainer2Team$.next(trainer2Team);
  },
  getStartingPokemon: (trainer2Team) => trainer2Team[0],
  subscribe: (trainer2Team) => trainer2Team$.subscribe(trainer2Team),
  getValue: () => trainer2Team$.value,
};

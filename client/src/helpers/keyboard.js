import { useMemo } from 'react';

import { KEYBOARD_BUTTONS } from '../constants/constants';
import { WordleGame } from '../store/wordle';

export function keyboardMemo() {
  return useMemo(() => {
    const keyboardMap = KEYBOARD_BUTTONS.map(button => (
      {
        value: button,
        label: button.toUpperCase(),
        action: () => {
          if (WordleGame.lettersInWordReached()) return;
          WordleGame.onUpdateWordTyped(button);
        },
      }
    ));
    const enterKey = {
      value: 'enter',
      label: 'ENTER',
      action: WordleGame.onPressEnter,
    };
    const backSpaceKey = {
      value: 'backspace',
      label: 'BACK',
      action: WordleGame.onPressBackSpace,
    };
    keyboardMap.splice(19, 0, backSpaceKey);
    keyboardMap.push(enterKey);
    return keyboardMap;
  }, []);
}

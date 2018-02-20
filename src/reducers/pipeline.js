import { Record } from 'immutable';
import update from 'immutability-helper'

import {
  MOVE_CARD,
  UPDATE_PIPELINE
} from '../actions/pipeline';

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  cards: [],
  isDragging: false
});
/* eslint-enable new-cap */
const initialState = new InitialState();

export default function cards(state = initialState, action) {
  const {payload, type} = action

  switch (type) {

    case MOVE_CARD: {
      const {dragCard, targetCard} = payload;
      const cards = state.cards;
      const sourceIndex = cards.findIndex(card => card.id === dragCard.id);
      const targetIndex = cards.findIndex(card => card.id === targetCard.id);
      const source = cards[sourceIndex];
      const target = cards[targetIndex];

      if((source.col === 0 && cards.filter(c => c.col === 0).length < 2)
          || (source.col === 1 && cards.filter(c => c.col === 1).length < 2)){
          alert(`Désolé je n'ai pas traité ce bug de 0 élément dans une colonne :)`);
          return state;
      }

      source.col = target.col
        
			return update(state, {
				cards: {
					$splice: [[sourceIndex, 1], [targetIndex, 0, source]],
				},
      });
    }   

    case UPDATE_PIPELINE: {
      const { pipeline } = payload;
      if(pipeline) return pipeline;
      break;
    }

    default:
      return state;
  }
}


// case GET_LISTS_START:
// return state.set('isFetching', true);
// case GET_LISTS:
// return state.withMutations((ctx) => {
//   ctx.set('isFetching', false)
//       .set('lists', action.lists);
// });
// case MOVE_CARD: {
// const newLists = [...state.lists];
// const { lastX, lastY, nextX, nextY } = action;
// if (lastX === nextX) {
//   newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
// } else {
//   // move element to new place
//   newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
//   // delete element from old place
//   newLists[lastX].cards.splice(lastY, 1);
// }
// return state.withMutations((ctx) => {
//   ctx.set('lists', newLists);
// });
// }
// case MOVE_LIST: {
// const newLists = [...state.lists];
// const { lastX, nextX } = action;
// const t = newLists.splice(lastX, 1)[0];

// newLists.splice(nextX, 0, t);

// return state.withMutations((ctx) => {
//   ctx.set('lists', newLists);
// });
// }
// case TOGGLE_DRAGGING: {
// return state.set('isDragging', action.isDragging);
// }
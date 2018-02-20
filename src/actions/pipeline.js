
export const MOVE_CARD = 'MOVE_CARD';
export const UPDATE_PIPELINE = 'UPDATE_PIPELINE';

export function moveCard(dragCard, targetCard) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, dragCard, targetCard });
  };
}

export function updatePipeline(pipeline) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PIPELINE, payload: pipeline });
  };
}
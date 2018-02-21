
export const MOVE_CARD = 'MOVE_CARD';
export const UPDATE_PIPELINE_FROM_BACKEND = 'UPDATE_PIPELINE_FROM_BACKEND';
export const SEND_CHANGE_TO_BACKEND = 'SEND_CHANGE_TO_BACKEND'

export function action_moveCard(dragCard, targetCard) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, payload: { dragCard, targetCard } });
    dispatch({ type: SEND_CHANGE_TO_BACKEND });
  };
}

export function action_updatePipelineFromBackend(pipeline) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PIPELINE_FROM_BACKEND, payload: pipeline });
  };
}
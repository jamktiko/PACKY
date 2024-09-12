export const Toggle_Modal = 'toggle_modal';
//Toggle_Modal is the action type that identifies the action

//toggle_modal is action creator function which returns an action object
//when the action is dispatched it will trigger the modalReducer function to handle the Toggle_Modal action type and switch the state
export const toggle_modal = () => {
  return { type: Toggle_Modal };
};

export const UPDATE_ACTIVE_CELLS = 'update_active_cells';
export const UPDATE_CHOOSABLE_CELLS = 'update_choosable_cells';
export const HANDLE_BUTTON_CLICK = 'handle_button_click';
export const TOGGLE_BUTTON_STATE = 'toggle_button_state';

export const handleButtonClick = (id: string) => {
  return { type: HANDLE_BUTTON_CLICK, payload: id };
};

export const toggleButtonState = (id: string) => {
  return { type: TOGGLE_BUTTON_STATE, payload: id };
};

export const updateActiveCells = (id: string) => {
  return { type: UPDATE_ACTIVE_CELLS, payload: id };
};

export const updateChoosableCells = (id: string) => {
  return { type: UPDATE_CHOOSABLE_CELLS, payload: id };
};

import { UPDATE_ACTIVE_CELLS } from '@/redux/actions/gridButtonActions';
import { UPDATE_CHOOSABLE_CELLS } from '@/redux/actions/gridButtonActions';
import { HANDLE_BUTTON_CLICK } from '@/redux/actions/gridButtonActions';
import { TOGGLE_BUTTON_STATE } from '@/redux/actions/gridButtonActions';

interface ButtonState {
  activeCells: [];
  choosableCells: [];
  handleButtonClick: (id: string) => {};
  toggleButtonState: (id: string) => {};
  updateActiveCells: (id: string) => {};
  updateChoosableCells: (id: string) => {};
}

const initialState = {
  activeCells: [],
  choosableCells: [],
};

import { Dictionary } from '../../types/utils/dataSet';

type Action<State, Payload> = (payload?: Payload, state?: State) => void;

export interface Section<T> {
  state: T;
  dispatch: <P>(actionName: string, payload: P) => void;
}

export const createSection = <SectionState>(section: {
  state: SectionState;
  actions: Dictionary<Action<SectionState, any>>;
}): Section<SectionState> => {
  const dispatch = <T>(actionName: string, payload: T) => {
    if (!section.actions[actionName]) {
      console.error(`Failed to dispatch action, ${actionName} doesn't exist.`);
      return;
    }
    section.actions[actionName](payload, section.state);
  };

  const getState = () => section.state;

  return {
    state: getState(),
    dispatch,
  };
};

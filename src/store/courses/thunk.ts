import { Dispatch } from 'redux';
import { IState } from 'types/state.interface';
import { coursesRemove } from './actionCreators';
import { deleteCourseFromAPI } from './services';

export const thunkCourseRemove = ({ id }: { id: string }) => {
	return async (dispatch: Dispatch, getState: () => IState) => {
		const result = await deleteCourseFromAPI(id, getState().user.token);
		if (result) {
			dispatch(coursesRemove(id));
		}
	};
};

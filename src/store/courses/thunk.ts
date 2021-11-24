import { Dispatch } from 'redux';
import { coursesServiceRemoveCourse } from 'services/courses.service';
import { coursesRemove } from './actionCreators';

export const thunkCourseRemove = ({ id }: { id: string }) => {
	return async (dispatch: Dispatch) => {
		const result = await coursesServiceRemoveCourse(id);
		if (result) {
			dispatch(coursesRemove(id));
		}
	};
};

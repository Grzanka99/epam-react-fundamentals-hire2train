import axios from 'axios';
import { API } from 'helpers/constants';

export async function deleteCourseFromAPI(
	id: string,
	token: string
): Promise<boolean> {
	try {
		const result = await axios.delete(`${API}/courses/${id}`, {
			headers: {
				Authorization: token,
			},
		});

		if (result.data.successful) return true;
		else throw new Error('Error deleting course');
	} catch (error) {
		return false;
	}
}

import { Builder } from 'services/api.service';
import { HttpMethods } from 'types/common.enum';
import { IResponse } from 'types/response.interface';
import { ICourse } from 'types/state.interface';

export const buildCoursesEndpoints = (builder: Builder) => ({
	loadCourses: builder.query<IResponse<ICourse[]>, void>({
		query: () => ({ url: 'courses/all' }),
	}),
	updateCourse: builder.mutation<IResponse<ICourse>, ICourse>({
		query: ({ id, ...body }) => ({
			url: `courses/${id}`,
			method: HttpMethods.PUT,
			body,
		}),
	}),
	createCourse: builder.mutation<IResponse<ICourse>, ICourse>({
		query: (body) => ({
			url: 'courses/add',
			method: HttpMethods.POST,
			body,
		}),
	}),
	removeCourse: builder.mutation<IResponse<string>, string>({
		query: (id) => ({
			url: `courses/${id}`,
			method: HttpMethods.DELETE,
		}),
		transformResponse: (response: IResponse<string>, _meta, arg) => ({
			...response,
			result: arg,
		}),
	}),
});

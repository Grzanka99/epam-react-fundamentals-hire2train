import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC, useMemo } from 'react';

import { translate } from 'helpers/constants';

import { PipeDuration } from 'components/PipeDuration/PipeDuration';

import { getAuthors, getCourses, getLang } from 'store/selectors';

import './CourseInfo.scss';

const CourseInfo: FC = () => {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	const { courseId } = useParams();

	const currentCourse = useMemo(
		() => courses.find((course) => course.id === courseId),
		[courses, courseId]
	);

	const lang = useSelector(getLang);

	const currentAuthors = useMemo(
		() =>
			currentCourse &&
			authors.filter((author) =>
				currentCourse.authors.includes(author.id || '')
			),
		[currentCourse, authors]
	);

	return (
		<div className='flex column course-info--wrapper'>
			<Link to='/courses'>
				{' '}
				{'<'} {translate(lang).LINK.BACK_TO_COURSES}
			</Link>
			<div className='flex column center course-info'>
				{!currentCourse ? (
					<h1>{translate(lang).TITLE.COURSE_INFO_FALLBACK}</h1>
				) : (
					<>
						<h1 className='courses-info__title'>{currentCourse.title}</h1>
						<div className='flex course-info__info-container'>
							<p>{currentCourse.description}</p>
							<div className='course-card__info'>
								<table>
									<tbody>
										<tr>
											<td>{translate(lang).COMMON.ID}:</td>
											<td className='info-id'>{currentCourse.id}</td>
										</tr>
										<tr>
											<td>{translate(lang).COMMON.DURATION}:</td>
											<td>
												<PipeDuration time={currentCourse.duration} />
											</td>
										</tr>
										<tr>
											<td>{translate(lang).COMMON.CREATED}:</td>
											<td>{currentCourse.creationDate.replace(/\//g, '.')}</td>
										</tr>
										<tr className='course-info__authors'>
											<td>{translate(lang).COMMON.AUTHORS}:</td>
											{currentAuthors?.map((author) => (
												<td key={author.id}>{author.name}</td>
											))}
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CourseInfo;

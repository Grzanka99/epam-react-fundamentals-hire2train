import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import pipeDuration from 'helpers/pipeDuration';

import './CourseInfo.scss';

const CourseInfo = ({ courses, authors }) => {
	const { courseId } = useParams();

	const currentCourse = courses.find((course) => course.id === courseId);

	return (
		<div className='flex column course-info--wrapper'>
			<Link to='/courses'> {'<'} Back to courses</Link>
			<div className='flex column center course-info'>
				<h1 className='courses-info__title'>{currentCourse.title}</h1>
				<div className='flex course-info__info-container'>
					<p>{currentCourse.description}</p>

					<div className='course-card__info'>
						<table>
							<tbody>
								<tr>
									<td>ID:</td>
									<td className='info-id'>{currentCourse.id}</td>
								</tr>
								<tr>
									<td>Duration:</td>
									<td>{pipeDuration(currentCourse.duration)}</td>
								</tr>
								<tr>
									<td>Created:</td>
									<td>{currentCourse.creationDate.replace(/\//g, '.')}</td>
								</tr>

								<tr className='course-info__authors'>
									<td>Authors:</td>
									{authors.map((el) => (
										<td>{el.name}</td>
									))}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

CourseInfo.propTypes = {
	courses: PropTypes.arrayOf(PropTypes.object).isRequired,
	authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CourseInfo;

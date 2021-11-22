import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import pipeDuration from 'helpers/pipeDuration';
import { translate } from 'helpers/constants';

import './CourseInfo.scss';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';

const CourseInfo = ({ courses, authors }) => {
	const { courseId } = useParams();

	const currentCourse = courses.find((course) => course.id === courseId);
	const lang = useSelector(getLang);

	if (!currentCourse) {
		// idk why, but this immediately returns to the home page
		return <h1>{translate(lang).TITLE.COURSE_INFO_FALLBACK}</h1>;
	}

	const currentAuthors = authors.filter((author) =>
		currentCourse.authors.includes(author.id)
	);

	return (
		<div className='flex column course-info--wrapper'>
			<Link to='/courses'>
				{' '}
				{'<'} {translate(lang).LINK.BACK_TO_COURSES}
			</Link>
			<div className='flex column center course-info'>
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
									<td>{pipeDuration(currentCourse.duration)}</td>
								</tr>
								<tr>
									<td>{translate(lang).COMMON.CREATED}:</td>
									<td>{currentCourse.creationDate.replace(/\//g, '.')}</td>
								</tr>
								<tr className='course-info__authors'>
									<td>{translate(lang).COMMON.AUTHORS}:</td>
									{currentAuthors.map((author) => (
										<td key={author.id}>{author.name}</td>
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

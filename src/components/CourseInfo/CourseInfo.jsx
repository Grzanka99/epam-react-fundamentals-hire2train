import { Link, useParams } from 'react-router-dom';

import pipeDuration from 'helpers/pipeDuration';

const CourseInfo = ({ courses, authors }) => {
	const { courseId } = useParams();

	const currentCourse = courses.find((course) => course.id === courseId);

	return (
		<div className='flex column'>
			<Link to='/'> {'<'} Back to courses</Link>
			<div className='flex column center'>
				<h1>{currentCourse.title}</h1>
				<div className='flex'>
					<p>{currentCourse.description}</p>

					<div className='course-card__info'>
						<table>
							<tbody>
								<tr>
									<td>Authors:</td>
									<td>{authors.map((el) => `${el.name}, `)}</td>
								</tr>
								<tr>
									<td>Duration:</td>
									<td>{pipeDuration(currentCourse.duration)}</td>
								</tr>
								<tr>
									<td>Created:</td>
									<td>{currentCourse.creationDate.replace(/\//g, '.')}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;

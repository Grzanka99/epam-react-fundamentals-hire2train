import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import pipeDuration from 'helpers/pipeDuration';
import { BUTTON } from 'constants.js';
import Button from 'common/Button/Button';
import './CourseCard.scss';

import { coursesRemove } from 'store/courses/actionCreators';

const CourseCard = ({
	title,
	description,
	authors,
	duration,
	createdAt,
	id,
}) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(coursesRemove(id));
	};

	return (
		<article className='course-card'>
			<div className='course-card__desc'>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className='course-card__info'>
				<table>
					<tbody>
						<tr>
							<td>Authors:</td>
							<td>{authors.map((el) => `${el.name}, `)}</td>
						</tr>
						<tr>
							<td>Duration:</td>
							<td>{pipeDuration(duration)}</td>
						</tr>
						<tr>
							<td>Created:</td>
							<td>{createdAt.replace(/\//g, '.')}</td>
						</tr>
					</tbody>
				</table>
				<div className='flex center'>
					<Button buttonText={BUTTON.SHOW_COURSE} pathTo={`/courses/${id}`} />
					<Button buttonText={BUTTON.DELETE_COURSE} onClick={handleDelete} />
				</div>
			</div>
		</article>
	);
};

CourseCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authors: PropTypes.arrayOf(PropTypes.shape),
};

export default CourseCard;

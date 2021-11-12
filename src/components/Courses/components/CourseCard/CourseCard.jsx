import PropTypes from 'prop-types';
import pipeDuration from '../../../../helpers/pipeDuration';
import { BUTTON } from '../../../../constants';

import Button from '../../../../common/Button/Button';

import './CourseCard.scss';

const CourseCard = ({
	title,
	description,
	authors,
	duration,
	createdAt,
	id,
}) => (
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
			<Button buttonText={BUTTON.SHOW_COURSE} pathTo={`/courses/${id}`} />
		</div>
	</article>
);

CourseCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authors: PropTypes.arrayOf(PropTypes.shape),
};

export default CourseCard;

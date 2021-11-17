import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import pipeDuration from 'helpers/pipeDuration';
import { BUTTON } from 'constants.js';
import Button from 'common/Button/Button';
import './CourseCard.scss';

import { coursesRemove } from 'store/courses/actionCreators';
import { ICourseCardProps } from 'types/props.interface';
import { IAuthor, IState } from 'types/state.interface';

const CourseCard = ({
	title,
	description,
	duration,
	creationDate,
	id,
	authors,
}: ICourseCardProps) => {
	const dispatch = useDispatch();

	const allAuthors = useSelector((state: IState) => state.authors);

	const currentAuthors: IAuthor[] = allAuthors.filter((author) =>
		authors.includes(author.id)
	);

	const handleDelete = (): void => {
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
							<td>{currentAuthors.map((el) => `${el.name}, `)}</td>
						</tr>
						<tr>
							<td>Duration:</td>
							<td>{pipeDuration(duration)}</td>
						</tr>
						<tr>
							<td>Created:</td>
							<td>{creationDate.replace(/\//g, '.')}</td>
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
	duration: PropTypes.number.isRequired,
	creationDate: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

export default CourseCard;

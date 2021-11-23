import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from 'helpers/constants';
import Button from 'common/Button/Button';
import './CourseCard.scss';

import { ICourseCardProps } from 'types/props.interface';
import { IAuthor } from 'types/state.interface';
import TrashIconSVG from 'svg/trash-icon.svg';
import PencilIconSVG from 'svg/pencil-icon.svg';
import { getAuthors, getIsAdmin, getLang } from 'store/selectors';
import { PipeDuration } from 'components/PipeDuration/PipeDuration';
import { thunkCourseRemove } from 'store/courses/thunk';

const CourseCard = ({
	title,
	description,
	duration,
	creationDate,
	id,
	authors,
}: ICourseCardProps) => {
	const dispatch = useDispatch();

	const allAuthors = useSelector(getAuthors);
	const lang = useSelector(getLang);
	const isAdmin = useSelector(getIsAdmin);

	const currentAuthors: IAuthor[] = allAuthors.filter((author) =>
		authors.includes(author.id || '')
	);

	const handleDelete = (): void => {
		dispatch(thunkCourseRemove({ id }));
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
							<td>{translate(lang).COMMON.AUTHORS}:</td>
							<td>{currentAuthors.map((el) => `${el.name}, `)}</td>
						</tr>
						<tr>
							<td>{translate(lang).COMMON.DURATION}:</td>
							<td>
								<PipeDuration time={duration} />
							</td>
						</tr>
						<tr>
							<td>{translate(lang).COMMON.CREATED}:</td>
							<td>{creationDate.replace(/\//g, '.')}</td>
						</tr>
					</tbody>
				</table>
				<div className='flex center'>
					<Button
						buttonText={translate(lang).BUTTON.SHOW_COURSE}
						pathTo={`/courses/${id}`}
					/>
					{isAdmin && (
						<>
							<Button onClick={handleDelete}>
								<TrashIconSVG />
							</Button>
							<Button>
								<PencilIconSVG />
							</Button>
						</>
					)}
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

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'common/Button/Button';
import { PipeDuration } from 'components/PipeDuration/PipeDuration';
import TrashIconSVG from 'svg/trash-icon.svg';
import PencilIconSVG from 'svg/pencil-icon.svg';

import { translate } from 'helpers/constants';
import { ICourseCardProps } from 'types/props.interface';
import { IAuthor } from 'types/state.interface';

import { getAuthors, getIsAdmin, getLang } from 'store/selectors';
import { thunkCourseRemove } from 'store/courses/thunk';

import './CourseCard.scss';

const CourseCard: FC<ICourseCardProps> = ({
	title,
	description,
	duration,
	creationDate,
	id,
	authors,
}) => {
	const dispatch = useDispatch();

	const allAuthors = useSelector(getAuthors);
	const lang = useSelector(getLang);
	const isAdmin = useSelector(getIsAdmin);

	const currentAuthors: IAuthor[] = allAuthors.filter((author) =>
		authors.includes(author.id || '')
	);

	const handleDelete = (): void => {
		if (!id) return;
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
							<Button pathTo={`/courses/update/${id}`}>
								<PencilIconSVG />
							</Button>
						</>
					)}
				</div>
			</div>
		</article>
	);
};

export default CourseCard;

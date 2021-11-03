import Button from '../../../../common/Button/Button';
import './CourseCard.scss';
import pipeDuration from '../../../../helpers/pipeDuration';

const CourseCard = ({ title, description, authors, duration, createdAt }) => (
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
			<Button buttonText='Show course' />
		</div>
	</article>
);

export default CourseCard;

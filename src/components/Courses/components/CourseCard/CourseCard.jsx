import Button from '../../../../common/Button/Button';

const CourseCard = ({ title, description, authors, duration, createdAt }) => (
	<article>
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
		<div>
			<table>
				<tr>
					<td>Authors:</td>
					<td>{authors.map((el) => `${el.name}, `)}</td>
				</tr>
				<tr>
					<td>Duration:</td>
					<td>{duration}</td>
				</tr>
				<tr>
					<td>Created:</td>
					<td>{createdAt}</td>
				</tr>
			</table>
			<Button buttonText='Show course' />
		</div>
	</article>
);

export default CourseCard;

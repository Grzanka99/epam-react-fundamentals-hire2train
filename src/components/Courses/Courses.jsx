import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import './Courses.scss';

const Courses = ({ changeView, courses, authors }) => (
	<section className='courses'>
		<div className='courses__heading'>
			<SearchBar />
			<Button buttonText='Add new course' onClick={changeView} />
		</div>
		<div>
			{courses.data.map((course) => (
				<CourseCard
					authors={authors.data.filter((author) =>
						course.authors.includes(author.id)
					)}
					description={course.description}
					title={course.title}
					duration={course.duration}
					key={course.id}
					createdAt={course.creationDate}
				/>
			))}
		</div>
	</section>
);

export default Courses;

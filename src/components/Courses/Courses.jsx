import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { mockedAuthorsList, mockedCoursesList } from './mockedData';
import './Courses.scss';

const Courses = ({ changeView }) => (
	<section className='courses'>
		<div className='courses__heading'>
			<SearchBar />
			<Button buttonText='Add new course' onClick={changeView} />
		</div>
		<div>
			{mockedCoursesList.map((course) => (
				<CourseCard
					authors={mockedAuthorsList.filter((author) =>
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

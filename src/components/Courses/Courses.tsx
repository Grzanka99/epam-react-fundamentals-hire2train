// it didn't compile without .js extension
import { BUTTON } from 'constants.js';

import Button from 'common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import './Courses.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAuthor, ICourse, IState } from 'types/state.interface';

const Courses = () => {
	const authors: IAuthor[] = useSelector((state: IState) => state.authors);
	const courses: ICourse[] = useSelector((state: IState) => state.courses);
	const [toDisplay, setToDisplay] = useState(courses);

	useEffect(() => {
		setToDisplay(courses);
	}, [courses]);

	return (
		<section className='courses'>
			<div className='courses__heading'>
				<SearchBar searchIn={courses} onFind={setToDisplay} />
				<Button buttonText={BUTTON.ADD_NEW} pathTo='/courses/add' />
			</div>
			<div>
				{toDisplay.map((course) => (
					<CourseCard {...course} />
				))}
			</div>
		</section>
	);
};

export default Courses;

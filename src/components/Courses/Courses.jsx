// it didn't compile without .js extension
import { BUTTON } from 'constants.js';

import PropTypes from 'prop-types';

import Button from 'common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import './Courses.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Courses = ({ courses }) => {
	const [toDisplay, setToDisplay] = useState(courses.data);

	const authors = useSelector((state) => state.authors);

	return (
		<section className='courses'>
			<div className='courses__heading'>
				<SearchBar searchIn={courses.data} onFind={setToDisplay} />
				<Button buttonText={BUTTON.ADD_NEW} pathTo='/courses/add' />
			</div>
			<div>
				{toDisplay.map((course) => (
					<CourseCard
						authors={authors.filter((author) =>
							course.authors.includes(author.id)
						)}
						description={course.description}
						title={course.title}
						duration={course.duration}
						key={course.id}
						createdAt={course.creationDate}
						id={course.id}
					/>
				))}
			</div>
		</section>
	);
};

Courses.propTypes = {
	courses: PropTypes.object.isRequired,
};

export default Courses;

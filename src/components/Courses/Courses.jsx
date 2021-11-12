// it didn't compile without .js extension
import { BUTTON } from 'constants.js';

import PropTypes from 'prop-types';

import Button from 'common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import './Courses.scss';
import { useState } from 'react';

const Courses = ({ courses, authors }) => {
	const [toDisplay, setToDisplay] = useState(courses.data);

	return (
		<section className='courses'>
			<div className='courses__heading'>
				<SearchBar searchIn={courses.data} onFind={setToDisplay} />
				<Button buttonText={BUTTON.ADD_NEW} pathTo='/courses/add' />
			</div>
			<div>
				{toDisplay.map((course) => (
					<CourseCard
						authors={authors.data.filter((author) =>
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
	authors: PropTypes.object.isRequired,
};

export default Courses;

import { translate } from 'helpers/constants';

import Button from 'common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import './Courses.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICourse } from 'types/state.interface';
import { getCourses, getIsAdmin, getLang } from 'store/selectors';

const Courses = () => {
	const courses: ICourse[] = useSelector(getCourses);
	const [toDisplay, setToDisplay] = useState(courses);
	const lang = useSelector(getLang);
	const isAdmin = useSelector(getIsAdmin);

	useEffect(() => {
		setToDisplay(courses);
	}, [courses]);

	return (
		<section className='courses'>
			<div className='courses__heading'>
				<SearchBar searchIn={courses} onFind={setToDisplay} />
				{isAdmin && (
					<Button
						buttonText={translate(lang).BUTTON.ADD_NEW}
						pathTo='/courses/add'
					/>
				)}
			</div>
			<div>
				{toDisplay.map((course) => (
					<CourseCard {...course} key={course.id} />
				))}
			</div>
		</section>
	);
};

export default Courses;

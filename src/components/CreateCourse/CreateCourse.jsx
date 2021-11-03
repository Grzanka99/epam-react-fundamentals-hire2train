import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { mockedAuthorsList } from '../Courses/mockedData';
import pipeDuration from '../../helpers/pipeDuration';
import './CreateCourse.scss';

const CreateCourse = ({ authors }) => {
	const [duration, setDuration] = useState(0);
	const [currAuthors, setCurrAuthors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit} className='create-course'>
			<div className='create-course__title'>
				<Input labelText='Title' />
				<Button buttonText='Create course' />
			</div>
			<label className='create-course__desc'>
				Description
				<textarea
					name='description'
					id='description-input'
					cols='30'
					rows='10'
					placeholder='Enter description'
				></textarea>
			</label>
			<div className='create-course__authors'>
				<div className='create-course__authors__left'>
					<div className='create-course__authors__left__new-author'>
						<h3>Add author</h3>
						<Input labelText='Author name' />
						<Button buttonText='Create author' />
					</div>
					<div>
						<h3>Duration</h3>
						<Input
							labelText='Duration'
							inputType='number'
							placeholderText='Enter duration in minutes'
							value={duration}
							min='1'
							onChange={({ target }) => setDuration(target.value)}
						/>
						Duration: {pipeDuration(duration)}
					</div>
				</div>
				<div className='create-course__authors__right'>
					<h3>Authors</h3>
					<div>
						{authors &&
							authors
								.filter((a) => !currAuthors.includes(a.id))
								.map((author) => (
									<div key={author.id} className='single-author'>
										<span>{author.name}</span>
										<Button
											buttonText='Add author'
											onClick={() =>
												setCurrAuthors([...currAuthors, author.id])
											}
										/>
									</div>
								))}
					</div>
					<h3>Course authors</h3>
					<div>
						{currAuthors.length ? (
							currAuthors.map((author) => {
								const curr = mockedAuthorsList.find((el) => el.id === author);
								return (
									<div key={curr.id} className='single-author'>
										<span>{curr.name}</span>
										<Button
											buttonText='Delete author'
											onClick={() =>
												setCurrAuthors(
													currAuthors.filter((el) => el !== curr.id)
												)
											}
										/>
									</div>
								);
							})
						) : (
							<span>Authors list is epmpty</span>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;

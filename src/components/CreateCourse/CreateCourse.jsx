import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const CreateCourse = ({ authors }) => {
	const [duration, setDuration] = useState(0);

	const toHours = (v) => {
		const minutes = v % 60;
		const hours = Math.floor(v / 60);

		return `${hours > 9 ? hours : `0${hours}`}:${
			minutes > 9 ? minutes : `0${minutes}`
		}`;
	};

	return (
		<form>
			<div>
				<Input labelText='Title' />
				<Button buttonText='Create course' />
			</div>
			<textarea
				name='description'
				id='description-input'
				cols='30'
				rows='10'
			></textarea>
			<div>
				<div>
					<div>
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
							onChange={(e) => setDuration(e.target.value)}
						/>
						Duration: {toHours(duration)} hours
					</div>
				</div>
				<div>
					<h3>Authors</h3>
					{authors &&
						authors.map((author) => (
							<div>
								<span>{author.name}</span>
								<Button buttonText='Add author' />
							</div>
						))}
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;

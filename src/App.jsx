import './App.css';
import Header from './components/Header/Header';
// import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedAuthorsList } from './components/Courses/mockedData';

function App() {
	return (
		<div>
			<Header />
			{/* <Courses /> */}
			<CreateCourse authors={mockedAuthorsList} />
		</div>
	);
}

export default App;

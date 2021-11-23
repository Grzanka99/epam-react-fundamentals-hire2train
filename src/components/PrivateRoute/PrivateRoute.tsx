import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getRole } from 'store/selectors';
import { IPrivateRouteProps } from 'types/props.interface';

export const PrivateRoute = ({ component }: IPrivateRouteProps) => {
	const isAdmin = useSelector(getRole);

	return isAdmin ? { component } : <Navigate to='/courses' />;
};

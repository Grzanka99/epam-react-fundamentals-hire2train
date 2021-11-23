import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getIsAdmin } from 'store/selectors';
import { IPrivateRouteProps } from 'types/props.interface';

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
	const isAdmin = useSelector(getIsAdmin);

	return <>{isAdmin ? children : <Navigate to='/course' />}</>;
};

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { getRole } from 'store/selectors';
import { Role } from 'types/common.enum';
import { IPrivateRouteProps } from 'types/props.interface';

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
	const isAdmin =
		useSelector(getRole).toLowerCase() === Role.Admin.toLowerCase();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!isAdmin) {
			if (location.pathname !== '/courses') {
				navigate('/courses');
			}
		}
	}, [isAdmin, location, navigate]);

	return <>{isAdmin ? children : ''}</>;
};

import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { IPrivateRouteProps } from 'types/props.interface';

import { getIsAdmin } from 'store/selectors';

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
	const isAdmin = useSelector(getIsAdmin);

	return <>{isAdmin ? children : <Navigate to='/course' />}</>;
};

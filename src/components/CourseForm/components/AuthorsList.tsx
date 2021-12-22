import Button from 'common/Button/Button';
import { translate } from 'helpers/constants';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';
import TrashIconSVG from 'svg/trash-icon.svg';
import { IAuthorsListProps } from 'types/props.interface';
import { IAuthor } from 'types/state.interface';

const AuthorsList: FC<IAuthorsListProps> = ({
	authors,
	onRemove,
	onAdd,
	onDelete,
	testId,
}) => {
	const isOnRemove = (): boolean => Boolean(onRemove);

	const lang = useSelector(getLang);

	return (
		<div className='authors-list'>
			{authors.map((author: IAuthor) => (
				<div key={author.id} className='single-author'>
					<span>{author.name}</span>
					<div className='flex'>
						{isOnRemove() && (
							// @ts-ignore-next-line
							<Button onClick={onRemove(author.id)}>
								<TrashIconSVG />
							</Button>
						)}
						<Button
							dataTestId={testId}
							buttonText={
								translate(lang).BUTTON[
									isOnRemove() ? 'ADD_AUTHOR' : 'DELETE_AUTHOR'
								]
							}
							onClick={
								isOnRemove()
									? // @ts-ignore-next-line
									  onAdd(author?.id || '')
									: // @ts-ignore-next-line
									  onDelete(author?.id || '')
							}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default AuthorsList;

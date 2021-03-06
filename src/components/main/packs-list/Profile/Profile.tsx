import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import s from './Profile.module.scss';
import RangeSlider from '../../../mui/range-slider/RangeSlider';
import { DenseTable } from '../../../mui/table/TableNew';
import { useAppSelector } from '../../../../redux/store';
import {
	isLoading,
	maxCardsInPackNumber,
	minCardsInPackNumber,
	selectLoginData,
} from '../../../../assets/selectors/authSelectors';
import { createPack, getPacks } from '../../../../redux/packs-reducer';
import { PaginationPacksContainer } from '../../../mui/pagination/PaginationPacksContainer';

const defaultAva = 'https://via.placeholder.com/150';

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function Profile() {
	const { name, avatar, _id } = useAppSelector(selectLoginData);
	const { currentUserId } = useParams();
	const dispatch = useDispatch();
	const isLoadingStatus = useAppSelector(isLoading);

	const [addPackValue, setAddPackValue] = useState('');
	const [search, setSearch] = useState<string>('');
	const min = useAppSelector(minCardsInPackNumber);
	const max = useAppSelector(maxCardsInPackNumber);

	const addNewPackClickHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		_id &&
			addPackValue &&
			dispatch(createPack(addPackValue, currentUserId || _id));
		setAddPackValue('');
	};
	const searching = () => {
		if (_id) {
			dispatch(
				getPacks({
					user_id: currentUserId ? currentUserId : _id,
					packName: search,
					min, // принимает значения для поиска из range slider
					max, // принимает значения для поиска из range slider
				}),
			);
		}
	};

	const handlerSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value);
	};

	const user_id = currentUserId ? currentUserId : _id;

	return (
		<div
			style={
				isLoadingStatus === 'loading'
					? { pointerEvents: 'none' }
					: { pointerEvents: 'auto' }
			}
		>
			<div className={s.wrapper}>
				<div className={s.wrapLeft}>
					<div className={s.wrapPerson}>
						<img className={s.img} src={avatar ? avatar : defaultAva} alt='' />
						<h3 className={s.subtitle}>{name}</h3>
						{_id === currentUserId ||
							(!currentUserId && (
								<Link to={'/edit-profile'}>
									<button className={s.btnEditProfile}>Edit Profile</button>
								</Link>
							))}
					</div>
					<div className={s.wrapSlider}>
						<h3 className={s.subtitleSlid}>Number of cards</h3>
						<RangeSlider />
					</div>
				</div>
				<div className={s.wrapRight}>
					<h2 className={s.title}>{`${name} Packs list`}</h2>
					<div className={s.wrapForm}>
						<form className={s.wrapForm} onSubmit={addNewPackClickHandler}>
							<input
								className={s.input}
								value={addPackValue}
								onChange={(e) => setAddPackValue(e.currentTarget.value)}
								placeholder='Type here'
							/>
							<button className={s.button}>Add new pack</button>
						</form>
						<div className={s.wrapForm}>
							<input
								className={s.input}
								value={search}
								onChange={handlerSearch}
								type='text'
								placeholder='Search...'
							/>
							<button className={s.button} onClick={searching}>
								Search
							</button>
						</div>
					</div>
					<div className={s.table}>
						<DenseTable user_id={user_id || ''} />
						<div className={s.wrapBottom}>
							<PaginationPacksContainer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;

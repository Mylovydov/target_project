import useDexieDB from './useDexieDB';
import { useMemo } from 'react';
import { usersObjectStoreName } from '../../../config/dexie';

const useUsersTable = () => {
	const dexieDB = useDexieDB();
	return useMemo(() => dexieDB[usersObjectStoreName], [dexieDB]);
};

export default useUsersTable;

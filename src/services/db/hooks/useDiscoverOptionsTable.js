import { useMemo } from 'react';
import useDexieDB from './useDexieDB';
import { discoverOptionsObjectStoreName } from '../../../config/dexie';

const useDiscoverOptionsTable = () => {
	const dexieDB = useDexieDB();
	return useMemo(() => dexieDB[discoverOptionsObjectStoreName], [dexieDB]);
};

export default useDiscoverOptionsTable;
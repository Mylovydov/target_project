import { useMemo } from 'react';
import useDexieDB from './useDexieDB';
import { metaKeysObjectStoreName } from '../../../config/dexie';

const useMetaKeysTable = () => {
	const dexieDB = useDexieDB();
	return useMemo(() => dexieDB[metaKeysObjectStoreName], [dexieDB]);
};

export default useMetaKeysTable;

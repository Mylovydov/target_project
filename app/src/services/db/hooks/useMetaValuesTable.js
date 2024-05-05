import useDexieDB from './useDexieDB';
import { useMemo } from 'react';
import { metaValuesObjectStoreName } from '../../../config/dexie';

const useMetaValuesTable = () => {
	const dexieDB = useDexieDB();
	return useMemo(() => dexieDB[metaValuesObjectStoreName], [dexieDB]);
};

export default useMetaValuesTable;

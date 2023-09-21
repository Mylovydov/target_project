import { useMemo } from 'react';
import { dexieDB } from '../../../config/dexie';

const useDexieDB = () => useMemo(() => dexieDB, []);

export default useDexieDB;
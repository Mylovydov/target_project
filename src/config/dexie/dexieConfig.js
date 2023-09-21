import Dexie from 'dexie';
import usersModel from './models/users';
import metaKeysModel from './models/metaKeys';
import metaValuesModel from './models/metaValues';
import { DBName } from './constants';
import discoverOptionsModel from './models/discoverOptions';

const dexieDB = new Dexie(DBName);

dexieDB.version(1)
	.stores({
		...usersModel,
		...metaKeysModel,
		...metaValuesModel,
		...discoverOptionsModel
	});

export default dexieDB;
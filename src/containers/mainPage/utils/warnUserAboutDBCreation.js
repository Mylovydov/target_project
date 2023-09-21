import useIndexedDBService from '../../../services/db/indexedDBService';
import { useCallback } from 'react'

const useWarnUserAboutDBCreation =  () => {
	const { checkDataBaseExist  } = useIndexedDBService();

	const userAgreesDBCleanup = useCallback(async () => {
		const isDBExists = await checkDataBaseExist();
		let isConfirmed = true;

		if (!isDBExists) {
			return isConfirmed
		}
		isConfirmed = window.confirm('When you load new data, the old data will be lost. Do you want to continue?');

		return !!isConfirmed
	}, [checkDataBaseExist]);

	return {
		userAgreesDBCleanup
	}
};

export default useWarnUserAboutDBCreation
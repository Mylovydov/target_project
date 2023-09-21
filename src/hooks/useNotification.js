import { useContext } from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

const useNotification = () => {
	const { open, close } = useContext(NotificationContext);
	return { open, close };
};

export default useNotification;
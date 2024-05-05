import { createContext } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import DeviceTypeAlert from '../components/deviceTypeAlert/DeviceTypeAlert';

const DeviceTypeContext = createContext(null);

const DeviceTypeProvider = ({ children, resolution }) => {
	const { isMobile } = useIsMobile(resolution);

	if (isMobile === null) {
		return isMobile;
	}

	return (
		<DeviceTypeContext.Provider value={{}}>
			{isMobile ? (
				<DeviceTypeAlert message="Sorry, this app only works with desktop devices!" />
			) : (
				children
			)}
		</DeviceTypeContext.Provider>
	);
};

export default DeviceTypeProvider;

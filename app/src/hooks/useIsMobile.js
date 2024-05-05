import { useCallback, useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

const useIsMobile = resolution => {
	const [_window, setWindow] = useState(null);
	const [isMobile, setIsMobile] = useState(null);

	const getDeviceType = () => {
		const parser = new UAParser(window.navigator.userAgent);
		return parser.getDevice().type;
	};

	const handleResize = useCallback(
		e => {
			const hasDeviceType = getDeviceType();
			const isMobile = !!(hasDeviceType || e.target.innerWidth <= resolution);
			setIsMobile(() => isMobile);
		},
		[resolution]
	);

	useEffect(() => {
		setWindow(window);
	}, []);

	useEffect(() => {
		if (_window) {
			const hasDeviceType = getDeviceType();
			const isMobile = !!(hasDeviceType || _window.innerWidth <= resolution);
			setIsMobile(() => isMobile);
		}
	}, [_window, resolution]);

	useEffect(() => {
		if (_window) {
			window.addEventListener('resize', handleResize);
		}

		return () => {
			if (_window) {
				window.removeEventListener('resize', handleResize);
			}
		};
	}, [_window, handleResize]);

	return { isMobile };
};

export default useIsMobile;

import { useCallback, useState } from 'react';

const useMultipleSelectionTable = () => {
	const [selectedItems, setSelectedItems] = useState([]);

	const onClearSelectedItems = useCallback(() => setSelectedItems([]), []);

	const onToggleSelect = useCallback((e, name) => {
		const selectedIndex = selectedItems.indexOf(name);
		let newSelectedRows = [];

		if (selectedIndex === -1) {
			newSelectedRows = [...selectedItems, name];
		} else if (selectedIndex === 0) {
			newSelectedRows = selectedItems.slice(1);
		} else if (selectedIndex === selectedItems.length - 1) {
			newSelectedRows = [...selectedItems.slice(0, -1)];
		} else if (selectedIndex > 0) {
			newSelectedRows = [
				...selectedItems.slice(0, selectedIndex),
				...selectedItems.slice(selectedIndex + 1)
			];
		}

		setSelectedItems(newSelectedRows);
	}, [selectedItems]);

	return {
		selectedItems,
		setSelectedItems,
		onClearSelectedItems,
		onToggleSelect
	};
};

export default useMultipleSelectionTable;
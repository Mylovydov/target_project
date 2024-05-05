import { useCallback, useEffect, useState } from 'react';

const useSortableTable = (data = [], columns) => {
	const [tableData, setSortData] = useState(data);

	useEffect(() => {
		setSortData(data);
	}, [data, columns]);

	const handleSorting = useCallback(
		(sortField, sortOrder) => {
			if (sortField) {
				const sorted = [...tableData].sort((a, b) => {
					const valueA = a[sortField];
					const valueB = b[sortField];

					if (typeof valueA === 'number' && typeof valueB === 'number') {
						return (valueA - valueB) * (sortOrder === 'asc' ? 1 : -1);
					}

					return (
						a[sortField]
							.toString()
							.localeCompare(b[sortField].toString(), 'en', {
								numeric: true
							}) * (sortOrder === 'asc' ? 1 : -1)
					);
				});
				setSortData(sorted);
			}
		},
		[tableData]
	);

	return [tableData, handleSorting];
};

export default useSortableTable;

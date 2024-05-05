const deepCompareObjects = arr => {
	const uniqueObjects = [];

	function isObjectEqual(obj1, obj2) {
		if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false;
		}

		for (const key in obj1) {
			if (!obj2.hasOwnProperty(key) || !valuesAreEqual(obj1[key], obj2[key])) {
				return false;
			}
		}

		return true;
	}

	function valuesAreEqual(value1, value2) {
		if (Array.isArray(value1) && Array.isArray(value2)) {
			if (value1.length !== value2.length) {
				return false;
			}

			for (let i = 0; i < value1.length; i++) {
				if (!value2.includes(value1[i])) {
					return false;
				}
			}
		} else if (value1 !== value2) {
			return false;
		}

		return true;
	}

	arr.forEach(obj => {
		const isUnique = !uniqueObjects.some(uniqueObj =>
			isObjectEqual(obj, uniqueObj)
		);

		if (isUnique) {
			uniqueObjects.push(obj);
		}
	});

	return uniqueObjects;
};

export default deepCompareObjects;

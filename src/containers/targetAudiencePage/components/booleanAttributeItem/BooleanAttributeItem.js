import { memo } from 'react';
import Checkbox from '../../../../components/checkbox/Checkbox';

const BooleanAttributeItem = ({ onBooleanAttrChange, value, name, label, type }) => (
	<Checkbox
		onChange={(e) => onBooleanAttrChange(e, type)}
		checked={value}
		size='small'
		name={name}
		label={label}
	/>
);

export default memo(BooleanAttributeItem);
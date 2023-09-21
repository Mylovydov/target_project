import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const IdentifyFilterStyled = styled(Stack, {
	name: 'IdentifyFilter',
	slot: 'Root'
})({
	padding: '1rem'
});

export const IdentifyFilterItemStyled = styled(Stack, {
	name: 'IdentifyFilterItem',
	slot: 'Root'
})({
	flex: '1',
});

export const IdentifyFilterTextStyled = styled(Typography, {
	name: 'IdentifyFilterText',
	slot: 'Root'
})(({ theme, ...rest }) => ({
	...(rest.variant === 'h6' && {
		...theme.typography.h6,
		'&.filterLabel': {
			fontSize: '1.4rem'
		}
	})
}));

export default IdentifyFilterStyled;
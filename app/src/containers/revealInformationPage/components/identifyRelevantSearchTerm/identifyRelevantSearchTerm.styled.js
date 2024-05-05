import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';

const IdentifyRelevantSearchTermStyled = styled(Stack, {
	name: 'IdentifyRelevantSearchTerm',
	slot: 'Root'
})({
	flex: '1'
});

export const IdentifyRelevantSearchTermHeadStyled = styled(Stack, {
	name: 'IdentifyRelevantSearchTermHead',
	slot: 'Root'
})({
	cursor: 'move',
	width: '100%'
});

export const IdentifyRelevantSearchTermBodyStyled = styled(Stack, {
	name: 'IdentifyRelevantSearchTermBody',
	slot: 'Root'
})({
	flex: '1 1 auto',
	marginTop: '1.5rem'
});

export default IdentifyRelevantSearchTermStyled;

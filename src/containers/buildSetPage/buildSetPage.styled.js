import { styled } from '@mui/material';
import Box from '@mui/material/Box';

const BuildSetPageStyled = styled('section', {
	name: 'BuildSetPage',
	slot: 'Root'
})({});

export const BuildSetPageHeadStyled = styled(Box, {
	name: 'BuildSetPageHead',
	slot: 'Root'
})({});

export const BuildSetPageBodyStyled = styled(Box, {
	name: 'BuildSetPageBody',
	slot: 'Root'
})({
	marginTop: '5rem'
});

export default BuildSetPageStyled;
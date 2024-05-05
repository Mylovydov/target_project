import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';

const BuildSetStyled = styled(Stack, {
	name: 'BuildSet',
	slot: 'Root'
})({
	height: '100%'
});

export const BuildSetHeadStyled = styled(Stack, {
	name: 'BuildSetHead',
	slot: 'Root'
})({});

export const BuildSetBodyStyled = styled(Stack, {
	name: 'BuildSetBody',
	slot: 'Root'
})({});

export default BuildSetStyled;

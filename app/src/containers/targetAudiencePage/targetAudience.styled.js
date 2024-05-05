import { Box, styled } from '@mui/material';

const TargetAudiencePageStyled = styled('section', {
	name: 'TargetAudience',
	slot: 'Root'
})({});

export const TargetAudiencePageHeadStyled = styled(Box, {
	name: 'TargetAudiencePageHead',
	slot: 'Root'
})({});

export const TargetAudiencePageBodyStyled = styled(Box, {
	name: 'TargetAudiencePageBody',
	slot: 'Root'
})({
	marginTop: '5rem'
});

export default TargetAudiencePageStyled;

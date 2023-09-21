import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TargetTooltipStyled, {
	TargetTooltipBodyStyled,
	TargetTooltipHeadStyled,
	TargetTooltipTextStyled
} from './targetTooltip.styled';
import RangeAttributeInfoItem from '../rangeAttributeInfoItem/RangeAttributeInfoItem';
import CategoricalAttributeInfoItem from '../categoricalAttributeInfoItem/CategoricalAttributeInfoItem';

const TargetTooltip = ({ title, rangeAttr, categoricalAttr, booleanAttr }) => {
	const filteredBooleanAttributes = !!booleanAttr?.length && booleanAttr.filter(attr => Boolean(attr.value));

	const rangeAttrMarkup = !!rangeAttr?.length && (
		<ListItem>
			<Stack spacing='0.5rem'>
				<TargetTooltipTextStyled
					variant='h6'
					className='heading'
				>
					Selected range attributes
				</TargetTooltipTextStyled>
				<Stack direction='row' spacing={2}>
					{rangeAttr.map(attr => (
						<RangeAttributeInfoItem key={attr.name} {...attr} />
					))}
				</Stack>
			</Stack>
		</ListItem>
	);

	const categoricalAttrMarkup = !!categoricalAttr?.length && (
		<ListItem>
			<Stack spacing='0.5rem'>
				<TargetTooltipTextStyled
					variant='h6'
					className='heading'
				>
					Selected categorical attributes
				</TargetTooltipTextStyled>
				<Stack spacing={1}>
					{categoricalAttr.map(attr => (
						<CategoricalAttributeInfoItem key={attr.name} {...attr} />
					))}
				</Stack>
			</Stack>
		</ListItem>
	);

	const booleanAttrMarlup = filteredBooleanAttributes && (
		<ListItem>
			<Stack spacing='0.5rem'>
				<TargetTooltipTextStyled
					variant='h6'
					className='heading'
				>
					Selected boolean attributes
				</TargetTooltipTextStyled>
				<Stack spacing={0.5}>
					{filteredBooleanAttributes.length
						? (filteredBooleanAttributes.map(attr => <Typography
							variant='body2' key={attr.label}
						>{attr.label}</Typography>))
						: 'No selected attributes'}
				</Stack>
			</Stack>
		</ListItem>
	);

	return (
		<TargetTooltipStyled>
			<TargetTooltipHeadStyled>
				<TargetTooltipTextStyled variant='h6' className='headingLg'>
					{title}
				</TargetTooltipTextStyled>
			</TargetTooltipHeadStyled>

			<TargetTooltipBodyStyled>
				<List>
					{rangeAttrMarkup}
					{categoricalAttrMarkup}
					{booleanAttrMarlup}
				</List>
			</TargetTooltipBodyStyled>
		</TargetTooltipStyled>
	);
};

export default TargetTooltip;
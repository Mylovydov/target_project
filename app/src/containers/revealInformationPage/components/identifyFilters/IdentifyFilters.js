import React, { memo } from 'react';
import RangeSlider from '../../../../components/rangeSlider/RangeSlider';
import IdentifyFilterStyled, {
	IdentifyFilterItemStyled,
	IdentifyFilterTextStyled
} from './identifyFilters.styled';
import TextInput from '../../../../components/textInput/TextInput';
import {
	identifyFilterRangeHelperText,
	identifyFilterTermNameInputHelperText,
	identifyFilterTermNumberHelperText,
	rangeProbabilityFilterName,
	searchTermNameFilterName,
	topSearchTermFilterName
} from '../../../../constants';
import Stack from '@mui/material/Stack';
import HelpTooltip from '../../../../components/helpTooltip/HelpTooltip';

const IdentifyFilters = ({ filterValues, onChangeFilters }) => {
	const { rangeProbability, topSearchTerm, searchTermName } = filterValues;
	return (
		<IdentifyFilterStyled direction="row" spacing={3} alignItems="center">
			<IdentifyFilterItemStyled spacing={2}>
				<Stack direction="row" spacing={1} alignItems="center">
					<IdentifyFilterTextStyled variant="h6" className="filterLabel">
						Select min - max probability
					</IdentifyFilterTextStyled>
					<HelpTooltip title={identifyFilterRangeHelperText} />
				</Stack>
				<RangeSlider
					step={1}
					name={rangeProbabilityFilterName}
					min={0}
					max={100}
					value={rangeProbability}
					handleChange={onChangeFilters}
					valueLabelFormat={value => `${(value / 100).toFixed(2)}`}
				/>
			</IdentifyFilterItemStyled>
			<IdentifyFilterItemStyled spacing={2}>
				<Stack direction="row" spacing={1} alignItems="center">
					<IdentifyFilterTextStyled variant="h6" className="filterLabel">
						Top N search terms by probability
					</IdentifyFilterTextStyled>
					<HelpTooltip title={identifyFilterTermNumberHelperText} />
				</Stack>
				<TextInput
					name={topSearchTermFilterName}
					type="number"
					value={topSearchTerm}
					onChange={onChangeFilters}
				/>
			</IdentifyFilterItemStyled>
			<IdentifyFilterItemStyled spacing={2}>
				<Stack direction="row" spacing={1} alignItems="center">
					<IdentifyFilterTextStyled variant="h6" className="filterLabel">
						Enter the search term
					</IdentifyFilterTextStyled>
					<HelpTooltip title={identifyFilterTermNameInputHelperText} />
				</Stack>
				<TextInput
					name={searchTermNameFilterName}
					placeholder="Enter the search term"
					value={searchTermName}
					onChange={onChangeFilters}
				/>
			</IdentifyFilterItemStyled>
		</IdentifyFilterStyled>
	);
};

export default memo(IdentifyFilters);

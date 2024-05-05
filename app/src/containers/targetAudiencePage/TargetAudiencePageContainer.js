import React, { useCallback, useEffect, useState } from 'react';
import TargetAudiencePageStyled, {
	TargetAudiencePageBodyStyled,
	TargetAudiencePageHeadStyled
} from './targetAudience.styled';
import Typography from '@mui/material/Typography';
import TargetAudienceCard from './components/targetAudienceCard/TargetAudienceCard';
import { useLiveQuery } from 'dexie-react-hooks';
import useIndexedDBService from '../../services/db/indexedDBService';
import AppBackdrop from '../../components/appBackdrop/AppBackdrop';
import transformAttributes from './utils/transformAttributes';
import {
	boolAttributesName,
	categoricalAttributesName,
	localStorageDefineTargetAudienceAttrKey,
	localStorageDefineTargetAudienceFilter,
	localStorageEnableORFilterTypeKey,
	minRangeDistanceOfDTAPage,
	rangeAttributesName,
	routes
} from '../../constants';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import transformAttributesToFilter from './utils/transformAttributesToFilter';
import useEnabledNav from '../../hooks/useEnabledNav';
import useNotification from '../../hooks/useNotification';

const TargetAudiencePageContainer = () => {
	const { getRespondentAttributes, getCurrentTargetAudienceNumber } =
		useIndexedDBService();
	const respondentAttr = useLiveQuery(getRespondentAttributes);
	const [, setAudienceFilter] = useLocalStorage(
		localStorageDefineTargetAudienceFilter
	);
	const [attributes, setAttributes] = useLocalStorage(
		localStorageDefineTargetAudienceAttrKey,
		null
	);
	const [, setIsORFilterType] = useLocalStorage(
		localStorageEnableORFilterTypeKey,
		null
	);
	const [, addNavItem] = useEnabledNav();
	const { open } = useNotification();

	const navigate = useNavigate();

	const [booleanAttr, setBooleanAttr] = useState(null);
	const [categoricalAttr, setCategoricalAttr] = useState(null);
	const [rangeAttr, setRangeAttr] = useState(null);
	const [currentTargetAudience, setCurrentTargetAudience] = useState(null);
	const [enableORFilterType, setEnableORFilterType] = useState(false);

	useEffect(() => {
		if (!(respondentAttr && respondentAttr.length)) {
			return;
		}

		if (attributes) {
			setRangeAttr(() => attributes?.[rangeAttributesName] || []);
			setBooleanAttr(() => attributes?.[boolAttributesName] || []);
			setCategoricalAttr(() => attributes?.[categoricalAttributesName] || []);
			return;
		}

		const transformedAttr = transformAttributes(respondentAttr);

		setRangeAttr(() => transformedAttr?.[rangeAttributesName] || []);
		setBooleanAttr(() => transformedAttr?.[boolAttributesName] || []);
		setCategoricalAttr(
			() => transformedAttr?.[categoricalAttributesName] || []
		);

		setAttributes(transformedAttr);
	}, [respondentAttr, attributes, setAttributes]);

	useEffect(() => {
		if (attributes) {
			const filter = transformAttributesToFilter(attributes);

			getCurrentTargetAudienceNumber(filter).then(targetAudience =>
				setCurrentTargetAudience(targetAudience)
			);
		}
	}, [attributes, getCurrentTargetAudienceNumber]);

	const handleChangeRangeAttr = useCallback(
		(event, newValue, activeThumb) => {
			if (!Array.isArray(newValue)) {
				return;
			}

			const changedAttributes = rangeAttr.map(attr => {
				if (attr.name !== event.target.name) {
					return attr;
				}

				const minValue = attr.value[0];
				const maxValue = attr.value[1];

				const newAttrValue =
					activeThumb === 0
						? [
								Math.min(newValue[0], maxValue - minRangeDistanceOfDTAPage),
								maxValue
							]
						: [
								minValue,
								Math.max(newValue[1], minValue + minRangeDistanceOfDTAPage)
							];

				return {
					...attr,
					value: newAttrValue
				};
			});

			setRangeAttr(() => changedAttributes);
			setAttributes({
				...attributes,
				[rangeAttributesName]: changedAttributes
			});
		},
		[rangeAttr, setAttributes, attributes]
	);

	const handleChangeCategoricalAttr = useCallback(
		(e, attrType, attrValue) => {
			const attrName = e.target.name;
			const checked = e.target.checked;

			const changedAttributes = categoricalAttr.map(attr => {
				if (attr.name !== attrName) {
					return attr;
				}

				const newAttributeValue = checked
					? [...attr.value, attrValue]
					: attr.value.filter(value => value !== attrValue);

				return { ...attr, value: newAttributeValue };
			});
			setCategoricalAttr(() => changedAttributes);
			setAttributes({ ...attributes, [attrType]: changedAttributes });
		},
		[categoricalAttr, setAttributes, attributes]
	);

	const handleChangeBooleanAttr = useCallback(
		(e, attrType) => {
			const attrName = e.target.name;
			const value = e.target.checked;

			const changedAttributes = booleanAttr.map(attr =>
				attr.name === attrName ? { ...attr, value } : attr
			);

			setBooleanAttr(() => changedAttributes);
			setAttributes({ ...attributes, [attrType]: changedAttributes });
		},
		[booleanAttr, setAttributes, attributes]
	);

	const onSubmit = () => {
		const attributesToTransform = {
			[boolAttributesName]: booleanAttr,
			[categoricalAttributesName]: categoricalAttr,
			[rangeAttributesName]: rangeAttr
		};

		const filterId = uuidv4();
		const audienceFilterItems = transformAttributesToFilter(
			attributesToTransform
		);

		const newAudienceFilter = {
			id: filterId,
			filterItems: audienceFilterItems
		};

		addNavItem(routes.revealInformation);
		setAudienceFilter(newAudienceFilter);
		setIsORFilterType(enableORFilterType);
		navigate(routes.revealInformation);
		open({
			message: 'Target audience definitions have been successfully applied',
			variant: 'success'
		});
	};

	const onClear = useCallback(() => {
		const transformedAttributes = transformAttributes(respondentAttr);

		setRangeAttr(() => transformedAttributes[rangeAttributesName]);
		setBooleanAttr(() => transformedAttributes[boolAttributesName]);
		setCategoricalAttr(() => transformedAttributes[categoricalAttributesName]);

		setAttributes(transformedAttributes);
	}, [respondentAttr, setAttributes]);

	const onChangeBooleanAttrFilterType = useCallback(() => {
		setEnableORFilterType(prevType => !prevType);
	}, []);

	const isLoading = booleanAttr && categoricalAttr && rangeAttr;

	if (!isLoading) {
		return <AppBackdrop open={!isLoading} />;
	}

	return (
		<TargetAudiencePageStyled>
			<TargetAudiencePageHeadStyled>
				<Typography textAlign="center" variant="h4" component="h1">
					Define Target Audience
				</Typography>
			</TargetAudiencePageHeadStyled>

			<TargetAudiencePageBodyStyled>
				<TargetAudienceCard
					formTitle="Respondent Attributes"
					formSubtitle="Select available respondent attributes to identify your target audience"
					infoTitle="Current respondent attributes"
					rangeInfoTitle="Current range attributes"
					categoricalInfoTitle="Current categorical attributes"
					boolInfoTitle="Current boolean attributes"
					categoricalAttr={categoricalAttr}
					booleanAttr={booleanAttr}
					rangeAttr={rangeAttr}
					booleanAttrTitle="Boolean fields"
					onSubmit={onSubmit}
					onClear={onClear}
					onRangeAttrChange={handleChangeRangeAttr}
					onCategoricalAttrChange={handleChangeCategoricalAttr}
					onBooleanAttrChange={handleChangeBooleanAttr}
					currentTargetAudience={currentTargetAudience}
					onChangeBooleanAttrFilterType={onChangeBooleanAttrFilterType}
					enableORFilterType={enableORFilterType}
				/>
			</TargetAudiencePageBodyStyled>
		</TargetAudiencePageStyled>
	);
};

export default TargetAudiencePageContainer;

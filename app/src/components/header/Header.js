import React, { useMemo } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import HeaderStyled, {
	HeaderActionsStyled,
	HeaderBodyStyled,
	HeaderNavStyled,
	NavLinkStyled
} from './Header.styled';
import {
	boolAttributesName,
	categoricalAttributesName,
	localStorageDefineTargetAudienceFilter,
	localStorageSearchTermSetKey,
	navigations,
	rangeAttributesName,
	routes
} from '../../constants';
import TargetAudienceIcon from '../icons/TargetAudienceIcon';
import useLocalStorage from '../../hooks/useLocalStorage';
import TargetTooltip from '../targetTooltip/TargetTooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useEnabledNav from '../../hooks/useEnabledNav';
import Tooltip from '../tooltip/Tooltip';
import transformAudienceFilter from '../../containers/utils/transformAudienceFilter';

const Header = () => {
	// const [anchorEl, setAnchorEl] = useState(null);
	const [audienceFilter] = useLocalStorage(
		localStorageDefineTargetAudienceFilter,
		null
	);
	const [searchTermSet] = useLocalStorage(localStorageSearchTermSetKey, null);
	const [enableNav] = useEnabledNav();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { targetAudience, buildSearchTermSet } = routes;

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	const tooltipContent = useMemo(() => {
		if (audienceFilter) {
			const transformedFilter = transformAudienceFilter(
				audienceFilter.filterItems
			);

			return (
				<TargetTooltip
					title="Selected respondent attributes"
					rangeAttr={transformedFilter?.[rangeAttributesName] || []}
					categoricalAttr={transformedFilter?.[categoricalAttributesName] || []}
					booleanAttr={transformedFilter?.[boolAttributesName] || []}
				/>
			);
		}
	}, [audienceFilter]);

	const enabledNavigations = useMemo(() => {
		if (enableNav) {
			const enableNavItems = navigations.filter(nav =>
				enableNav.includes(nav.path)
			);
			return !!searchTermSet?.length
				? [
						...enableNavItems,
						{
							path: routes.buildSearchTermSet,
							label: 'Build Set'
						}
					]
				: enableNavItems;
		}
	}, [enableNav, searchTermSet?.length]);

	const targetAudienceMarkup =
		!audienceFilter || pathname === targetAudience ? (
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				onClick={() => navigate(targetAudience)}
			>
				<TargetAudienceIcon width={24} height={24} />
			</IconButton>
		) : (
			<Tooltip
				title={tooltipContent}
				arrow={true}
				disableFocusListener
				placement="left-start"
			>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					onClick={() => navigate(targetAudience)}
				>
					<TargetAudienceIcon width={24} height={24} />
				</IconButton>
			</Tooltip>
		);

	if (!enableNav) {
		return null;
	}

	return (
		<HeaderStyled position="fixed">
			<Container maxWidth="xl">
				<HeaderBodyStyled>
					<HeaderNavStyled component="nav" direction="row" spacing={4}>
						{enabledNavigations.map(({ path, label }) => (
							<NavLinkStyled key={path} to={path} active={+(pathname === path)}>
								{label}
							</NavLinkStyled>
						))}
					</HeaderNavStyled>
					<HeaderActionsStyled direction="row" spacing={2}>
						{targetAudienceMarkup}
						{!!searchTermSet?.length && (
							<IconButton
								size="large"
								onClick={() => navigate(buildSearchTermSet)}
							>
								<ShoppingCartIcon
									sx={{ color: theme => theme.palette.common.white }}
								/>
							</IconButton>
						)}
					</HeaderActionsStyled>
				</HeaderBodyStyled>
			</Container>
		</HeaderStyled>
	);
};

export default Header;


// {/*<HeaderNavStyled>*/}
// {/*	<IconButton*/}
// {/*		size='large'*/}
// {/*		edge='start'*/}
// {/*		color='inherit'*/}
// {/*		aria-label='menu'*/}
// {/*		sx={{ mr: 2 }}*/}
// {/*		onClick={(e) => setAnchorEl(e.currentTarget)}*/}
// {/*	>*/}
// {/*		<MenuIcon/>*/}
// {/*	</IconButton>*/}
// {/*	<Menu*/}
// {/*		anchorEl={anchorEl}*/}
// {/*		open={!!anchorEl}*/}
// {/*		onClose={handleClose}*/}
// {/*	>*/}
// {/*		{enabledNavigations.map(({ path, label }) => (*/}
// {/*			<NavItemStyled key={path}>*/}
// {/*				<NavLinkStyled onClick={handleClose} to={path}>*/}
// {/*					{label}*/}
// {/*				</NavLinkStyled>*/}
// {/*			</NavItemStyled>*/}
// {/*		))}*/}
// {/*	</Menu>*/}
// {/*</HeaderNavStyled>*/}
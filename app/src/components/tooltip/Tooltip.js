import TooltipStyled from './tooltip.styled';

const Tooltip = ({ children, ...props }) => {
	return <TooltipStyled {...props}>{children}</TooltipStyled>;
};

export default Tooltip;

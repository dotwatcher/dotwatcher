import format from "date-fns/format";

import styled from "styled-components";
import moment from "moment";
import tachyons from "styled-components-tachyons";

import EventCell from "./EventCell";

const Span = styled.span`
	${tachyons}
`;

const Div = styled.div`
	${tachyons}
`;

const DayOfWeek = styled(Span)`
	@media screen and (min-width: 48em) {
		display: none;
	}
`;
export const Cell = styled.div`
	min-height: 150px;
	border-bottom: 1px solid var(--black);
	padding: var(--spacing-small);
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	${props => !props.isCurrentMonth && "background-color: var(--light-gray);"}
	${props =>
		props.isToday &&
		"background-color: var(--lightest-blue);"}
	
	@media screen and (min-width: 48em) {
		${props => props.index % 7 !== 0 && "border-left: 1px solid var(--black);"}

		&:nth-last-child(-n+7) {
			border-bottom: none;
		}
	}
`;

const StyledDate = styled(Div)`
	order: 5;
`;

const StyledEvents = styled(Div)`
	grid-area: event;
`;

const DateCell = ({ isCurrentMonth, events = [], date = "", index }) => {
	const noEvents = events.length === 0;
	const dateNo = format(date, "Do");
	const dayOfWeek = format(date, "ddd");

	const m_today = moment(Date.now());
	const m_date = moment(date);
	const isToday = m_date.startOf("day").isSame(m_today.startOf("day"));

	return (
		<Cell
			isCurrentMonth={isCurrentMonth}
			isToday={isToday}
			noEvents={noEvents}
			index={index}
		>
			<StyledDate mb2>
				<DayOfWeek>{dayOfWeek} &nbsp;</DayOfWeek>
				<Span>{dateNo}</Span>
			</StyledDate>

			<StyledEvents>
				{events.map((e, i) => (
					<EventCell key={i} calendarDate={date} {...e} />
				))}
			</StyledEvents>
		</Cell>
	);
};

export default DateCell;

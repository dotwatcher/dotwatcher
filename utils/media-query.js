import { css } from "styled-components";

export const screenSizes = {
	smDown: 48,
	mdDown: 64,
	lgDown: 75,
	xlgDown: 1200
};

const mqSizes = {
	smDown: `(max-width: ${screenSizes.smDown}em)`,
	mdDown: `(max-width: ${screenSizes.mdDown}em)`,
	smToMd: `(min-width: ${screenSizes.smDown +
		1}em) and (max-width: ${screenSizes.mdDown + 1}em)`,
	smUp: `(min-width: ${screenSizes.smDown}em)`,
	mdUp: `(min-width: ${screenSizes.smDown + 1}em)`,
	lgUp: `(min-width: ${screenSizes.lgDown + 1}em)`,
	xlgUp: `(min-width: ${screenSizes.xlgDown + 1}em)`
};

const mq = Object.keys(mqSizes).reduce((acc, label) => {
	return label
		? {
				...acc,
				[label]: (...args) => css`
					@media screen and ${mqSizes[label]} {
						${css(...args)};
					}
				`
		  }
		: acc;
}, {});

export default mq;

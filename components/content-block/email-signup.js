import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import ReactMarkdown from 'react-markdown';
import { useCookies } from 'react-cookie';

const mailchimpURL = process.env.MAILCHIMP || '';

const Form = styled.form`${tachyons}`;
const Div = styled.div`${tachyons}`;
const P = styled.p`${tachyons}`;
const A = styled.a`${tachyons}`;
const Header = styled.header`
	p {
		max-width: 42em;
		margin-top: 0;
		line-height: 1.5;
	}
${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const Message = styled.div`
	a:link, a:visited {
		color: var(--blue)
	}
	a:hover {
		color: var(--light-blue)
	}
${tachyons}`;
const Button = styled.button`
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	border: 0;
	background: transparent;

	&:hover {
		background: var(--blue);
	}
${tachyons}`;

const CustomForm = ({status, message, onValidated, layout}) => {
	const EmailInput = styled.input`
		font-size: ${layout === 'small' ? 1 : 1.25 }rem;
		&:focus {
			outline: 0;
			background-color: var(--light-yellow);
		}
	${tachyons}`;
	const SubmitButton = styled.button`
		font-size: ${layout === 'small' ? 1 : 1.25 }rem;
		&:focus, &:hover {
			border-color: var(--dark-blue);
			background-color: var(--dark-blue);
			outline: 0;
		}
		&:active {
			border-color: var(--gold);
			background-color: var(--gold);
		}
	${tachyons}`;

	const [cookies, setCookie] = useCookies(['hideSignup']);
	let email;
	const submit = () =>
		email &&
		onValidated({
			EMAIL: email.value
		});

	if (message && message.startsWith('0 - ')) {
		message = message.split('0 - ')[1];
	}

	const markAsSignedUp = () => {
		setCookie('hideSignup', true, { 
			path: '/',
			maxAge: 31557600 // 1 year in seconds
		});
	}

	return (
		<Form
			onSubmit={
				e => {
					e.preventDefault();
					submit();
					markAsSignedUp();
				}
			}
		>
			<EmailInput
				ref={node => email = node}
				type="email"
				placeholder="your.name@email.com"
				input_reset ba bw1
				b__blue ph3
				pv2 mt4
				mb2 br_0_l
				fl w_100 w_60_ns
			/>
			<SubmitButton bg_blue fl w_100 w_40_ns pa2 mt4 mb2 center tc white tracked ttl small_caps ba bw1 b__blue type="submit">
				Subscribe
			</SubmitButton>
			{status === 'sending' && <Message fl w_70 ph3 f6 lh_copy>sending...</Message>}
			{status === 'error' && (
				<Message fl w_70 red ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
			{status === 'success' && (
				<Message fl w_70 ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
			<P fl ma0 w_100 lh_copy f6><A link white hover_blue underline href="https://us18.campaign-archive.com/home/?u=f99c4be1902d7d056695899c7&id=5114f468a5" target="_blank">See all past issues</A></P>
		</Form>
	);
};

const EmailSignup = ({block, layout}) => {
	if (block.heading) {
		return (
			<Div mb4 mb5_l pv4 ph3 ph4_ns className="bg-gradient-blue cf">
				<Div w_90 w_60_l center pv4 ph3 ph4_ns bg_white_20 white className="cf">
					<Header>
						<H2 f3 f2_ns fw6 mt0 mb2 pb1 lh_title>{block.heading}</H2>
						<Div measure lh_copy f5 f4_ns>
							<ReactMarkdown measure
								source={block.words}
							/>
						</Div>
					</Header>
					<MailchimpSubscribe
						url={mailchimpURL}
						render={({subscribe, status, message}) => (
							<CustomForm
								status={status}
								message={message}
								onValidated={formData => subscribe(formData)}
								url={mailchimpURL}
							/>
						)}
					/>
				</Div>
			</Div>
		)
	} else {
		const [cookies, setCookie] = useCookies(['hideSignup']);
		
		const markAsSignedUp = () => {
			setCookie('hideSignup', true, {
				path: '/',
				maxAge: 31557600 // 1 year in seconds
			});
		}

		return (
			<Div mb4 mb5_l pa3 white relative className="bg-gradient-blue cf">
				<Button absolute right_1 white f4 fw7 lh_copy onClick={() => markAsSignedUp()}>×</Button>
				<H2 ma0 mb3>The DotWatcher Digest</H2>
				<P lh-copy ma0>For all the latest updates from the bikepacking webosphere and beyond, sign up to DotWatcher Digest.</P>
				<MailchimpSubscribe
					url={mailchimpURL}
					render={({ subscribe, status, message }) => (
						<CustomForm
							status={status}
							message={message}
							onValidated={formData => subscribe(formData)}
							url={mailchimpURL}
							layout={layout}
						/>
					)}
				/>
			</Div>
		)
	}
}

EmailSignup.propTypes = {
	block: PropTypes.object,
	layout: PropTypes.string,
};

EmailSignup.defaultProps = {
	block: {},
	layout: 'large'
};

CustomForm.propTypes = {
	status: PropTypes.string,
	message: PropTypes.string,
	onValidated: PropTypes.func.isRequired,
	layout: PropTypes.string
};

CustomForm.defaultProps = {
	status: '',
	message: '',
	layout: 'large'
};

export default EmailSignup;

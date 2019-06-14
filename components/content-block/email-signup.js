import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import ReactMarkdown from 'react-markdown';

const mailchimpURL = process.env.MAILCHIMP || '';

const Form = styled.form`${tachyons}`;
const Div = styled.div`${tachyons}`;
const Header = styled.header`
	p {
		max-width: 42em;
		margin-top: 0;
		line-height: 1.5;
	}
${tachyons}`;
const H2 = styled.h2`${tachyons}`;
const EmailInput = styled.input`
	&:focus {
		outline: 0;
		background-color: var(--light-yellow);
	}
${tachyons}`;
const SubmitButton = styled.button`
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
const Message = styled.div`
	a:link, a:visited {
		color: var(--blue)
	}
	a:hover {
		color: var(--light-blue)
	}
${tachyons}`;

const CustomForm = ({status, message, onValidated}) => {
	let email;
	const submit = () =>
		email &&
		onValidated({
			EMAIL: email.value
		});

	if (message && message.startsWith('0 - ')) {
		message = message.split('0 - ')[1];
	}

	return (
		<Form
			onSubmit={
				e => {
					e.preventDefault();
					submit();
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
				mb2 f5 f4 br_0_l
				fl w_100 w_70_ns
			/>
			<SubmitButton f4 bg_blue fl w_100 w_30_ns ph3 pv2 mt4 mb2 center tc white tracked ttl small_caps ba bw1 b__blue type="submit">
				Subscribe
			</SubmitButton>
			{status === 'sending' && <Message fl w_70 ph3 f6 lh_copy>sending...</Message>}
			{status === 'error' && (
				<Message fl w_70 red ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
			{status === 'success' && (
				<Message fl w_70 ph3 f6 lh_copy dangerouslySetInnerHTML={{__html: message}}/>
			)}
		</Form>
	);
};

const EmailSignup = ({block}) => (
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
);

EmailSignup.propTypes = {
	block: PropTypes.object.isRequired
};

CustomForm.propTypes = {
	status: PropTypes.string,
	message: PropTypes.string,
	onValidated: PropTypes.func.isRequired
};

CustomForm.defaultProps = {
	status: '',
	message: ''
};

export default EmailSignup;

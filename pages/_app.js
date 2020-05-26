import React from "react";
import App from "next/app";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: process.env.SENTRY_DSN
});

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	constructor(props) {
		super(props);

		this.state = {
			user: {}
		};
	}

	async componentDidMount() {
		const user = async () => {
			try {
				const res = await axios({ method: "get", url: "/api/auth/me" });

				if (!res.error && res.status === 200 && res.data) {
					return {
						loggedIn: true,
						user: res.data
					};
				}
			} catch (e) {
				return {
					loggedIn: false
				};
			}
		};

		this.setState({
			user: await user()
		});
	}

	componentDidCatch(error, errorInfo) {
		Sentry.withScope(scope => {
			Object.keys(errorInfo).forEach(key => {
				scope.setExtra(key, errorInfo[key]);
			});

			Sentry.captureException(error);
		});

		super.componentDidCatch(error, errorInfo);
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<CookiesProvider>
				<Component {...pageProps} user={this.state.user} />
			</CookiesProvider>
		);
	}
}

export default MyApp;

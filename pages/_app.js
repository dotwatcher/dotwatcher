import React from "react";
import App from "next/app";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import * as Sentry from "@sentry/browser";
import smoothscroll from "smoothscroll-polyfill";
import { createGlobalStyle } from "styled-components";
import "react-quill/dist/quill.snow.css";
import colors from "@Utils/colors";

import Layout from "../components/New/Layout";

import "hamburgers/dist/hamburgers.min.css";

if (typeof window !== "undefined") {
	// kick off the polyfill!
	smoothscroll.polyfill();
}

if (process.env.NODE_ENV === "production") {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		release: "dotwatcher@" + process.env.VERCEL_GITHUB_COMMIT_SHA
	});
}

const GlobalStyle = createGlobalStyle`
 * {
		font-family: "Raleway", sans-serif;
	}

	p {
    line-height: 26px;
    font-size: 18px;
	}

	a {
		color: ${colors.primary};

		&:hover {
			color: ${colors.primaryHover}
		}
	}
`;

var styles = [
	`background: linear-gradient(${colors.primary}, transparent)`,
	"color: white",
	"display: block",
	"line-height: 40px",
	"text-align: center",
	"font-weight: bold",
	"padding: 0 30px"
].join(";");

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

		const status = await user();

		if (status.loggedIn) {
			this.setState({
				user: status
			});
		}
	}

	componentDidCatch(error, errorInfo) {
		if (process.env.NODE_ENV === "production") {
			Sentry.withScope(scope => {
				Object.keys(errorInfo).forEach(key => {
					scope.setExtra(key, errorInfo[key]);
				});

				Sentry.captureException(error);
			});

			super.componentDidCatch(error, errorInfo);
		}
	}

	render() {
		process.env.NODE_ENV === "production" &&
			console.log("%c Development by alex@windett.co.uk", styles);

		const { Component, pageProps } = this.props;

		return (
			<CookiesProvider>
				<GlobalStyle />
				<Layout user={this.state.user}>
					<Component {...pageProps} user={this.state.user} />
				</Layout>
			</CookiesProvider>
		);
	}
}

export default MyApp;

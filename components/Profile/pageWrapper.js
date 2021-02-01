import Head from "next/head";

const PageWrapper = ({ children, name }) => (
	<>
		<Head>
			<title>{name}’s race results - DotWatcher.cc</title>
			<meta
				property="og:title"
				content={`${name}’s race results - DotWatcher.cc`}
			/>
			<meta
				property="og:description"
				content={`Historic results from ultra-cycling races for ${name}`}
			/>
			<meta
				property="og:image"
				content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
			/>
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@dotwatcher" />
			<meta name="twitter:creator" content="@dotwatcher" />
			<meta
				name="twitter:title"
				content={`${name}’s race results - DotWatcher.cc`}
			/>
			<meta
				name="twitter:description"
				content={`Historic results from ultra-cycling races for ${name}`}
			/>
			<meta
				name="twitter:image"
				content="https://images.ctfassets.net/6hyijb95boju/KQ7Yj247Go6KOIm60SeQ2/9315aa310eee6a72088c9c37de8aa1e6/DotWatcher---Logo---Pin-_1_.jpg"
			/>
			<meta
				name="description"
				content={`Historic results from ultra-cycling races for ${name}`}
			/>
		</Head>

		{children}
	</>
);

export default PageWrapper;

import React, { useState } from "react";

import Head from "next/head";
import Page from "../../components/shared/page";

/**
 * CSS for iFrame is found in /static/digest.css as we aren't using styled-components here
 *
 * https://mailchimp.com/help/add-an-email-campaign-archive-to-your-website/
 * &show=20 relates to how many items to show - pagination is not a feature mailchimp offer
 */

export default () => (
	<Page>
		<Head>
			<link href="/static/digest.css" rel="stylesheet" />
			<script
				language="javascript"
				src="//dotwatcher.us18.list-manage.com/generate-js/?u=f99c4be1902d7d056695899c7&fid=7009&show=20"
				type="text/javascript"
			/>
		</Head>
	</Page>
);

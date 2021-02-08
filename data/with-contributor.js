import React from 'react';
import { createClient } from 'contentful';
import vars from './api-vars';

export const WithContributor = Page => {
  const WithContributor = props => <Page {...props} />;

  WithContributor.getInitialProps = async ({ query: { name } }) => {

    const client = createClient({
      space: vars.space,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    const response = await client.getEntries({
      'content_type': 'contributor',
      'fields.slug': name
    });

    let contributor;

    if (response.items[0]) {
      contributor = response.items[0].fields
      contributor.id = response.items[0].sys.id
      contributor.avatar = {
        url: contributor.avatar.fields.file.url,
        title: contributor.avatar.fields.title,
        description: contributor.avatar.fields.description
      }
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      contributor
    };
  };

  return WithContributor;
};

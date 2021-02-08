// HOC for fetching entries from contentful

import React from 'react';
import { createClient } from 'contentful';
import vars from './api-vars';

export const withAbout = Page => {
  const withAbout = props => <Page {...props} />;

  withAbout.getInitialProps = async () => {
    const client = createClient({
      space: vars.space,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    const pageResponse = await client.getEntries({
      'sys.id': vars.pages.about,
      'include': 2
    });
    let page;

    if (pageResponse.items[0]) {
      page = {
        id: pageResponse.items[0].sys.id,
        title: pageResponse.items[0].fields.title,
        text: pageResponse.items[0].fields.text,
        blocks: []
      };

      if (pageResponse.items[0].fields.bannerImage) {
        page.image = pageResponse.includes.Asset.find(obj => {
          return obj.sys.id === pageResponse.items[0].fields.bannerImage.sys.id;
        });
      }

      if (pageResponse.items[0].fields.contentBlock) {
        for (const contentBlock of pageResponse.items[0].fields.contentBlock) {
          const block = {
            sys: {
              id: contentBlock.sys.id
            },
            heading: contentBlock.fields.heading,
            layout: contentBlock.fields.layout,
            words: contentBlock.fields.words,
            link: contentBlock.fields.link,
            callToAction: contentBlock.fields.callToActionText
          };

          if (contentBlock.fields.race) {
            block.race = contentBlock.fields.race;
          }

          if (contentBlock.fields.feature) {
            block.feature = contentBlock.fields.feature.sys.id;
          }

          if (contentBlock.fields.image) {
            block.image = pageResponse.includes.Asset.find(obj => {
              return obj.sys.id === contentBlock.fields.image.sys.id;
            });
          }
          if (contentBlock.fields.logoOverlay) {
            block.logoOverlay = pageResponse.includes.Asset.find(obj => {
              return obj.sys.id === contentBlock.fields.logoOverlay.sys.id;
            });
          }
          page.blocks.push(block);
        }
      }
    }

    // Get contributors
    const contributorsResponse = await client.getEntries({
      content_type: 'contributor'
    });
    const contributors = [];

    if (contributorsResponse.items.length > 0) {
      for(const contributorData of contributorsResponse.items) {
        const contributor = contributorData.fields
        contributor.id = contributorData.sys.id

        if (contributor.slug !== 'jon-heslop') {
          contributors.push(contributor)
        }
      }
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      page,
      contributors
    };
  };

  return withAbout;
};

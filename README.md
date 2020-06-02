# Dotwatcher

_Long distance bike race coverage_

Dotwatcher is powered by Zeit’s [Next.js], a framework for server-rendered react apps.

All the content is on [Contentful] and is retrieved via their [node client].

## Local development

To get started clone the repo and run `npm install` or `yarn`.

To be able to access the content for development you’ll need to create a file in the base of the repo called `now-secrets.json` and inside that paste:

```json
{
  "@contentful-api-token": "",
  "@pusher-app-id": "",
  "@pusher-key": "",
  "@pusher-secret": "",
  "@mailchimp": "",
  "@analytics": "UA-XXXXXX-X",
  "@scrapey-api-key": "",
  "@cloudinary-name": "",
  "@cloudinary-preset": "",
  "@cloudinary-key": "",
  "@cloudinary-secret": "",
  "@auth0-domain": "",
  "@auth0-client-id": "",
  "@auth0-client-secret": "",
  "@auth0-app-client-id": "",
  "@auth0-app-client-secret": "",
  "@auth0-app-cookie-secret": "",
  "@auth0-callback-domain": ""
}
```

And paste in the relevant token’s that you need. You can manage without everything except contentful, if you’re in a hurry.

This file is only used for local development. In production the secrets are stored with `now secret`, you can learn more about that [here](https://zeit.co/blog/environment-variables-secrets).

Now run `npm run dev` to get going.

## Technologies used

- Styles — [styled-components] with [Tachyons]
- Realtime updates — [Pusher] which connects to [stream.dotwatcher.cc]
- Content — [Contentful API] to get all data and images
- Maps — Right now maps are just iFrames from [Trackleaders]
- Mailchimp Archive — https://mailchimp.com/help/add-an-email-campaign-archive-to-your-website/. An iframe page under /digest-archive is injected into /digest. The JS snippet from mailchimp will otherwise place the archive page at the very start of the DOM. An iframe allows us to chose where in the page it sits.

## Deploying

To deploy changes you’ll need an account with [zeit.co] and then someone needs to add you to the dotwatchers team.

You’ll need to download the [Now cli] and then switch teams with `now switch`

Then do deploy a new instance run `now` from within the repo.

To alias that to our domains run `now alias` (the aliases are stored in now.json)

[next.js]: https://github.com/zeit/next.js/
[contentful]: http://contentful.com/
[node client]: https://github.com/contentful/contentful.js/
[zeit.co]: https://zeit.co
[now cli]: https://zeit.co/now
[styled-components]: https://www.styled-components.com/
[tachyons]: http://tachyons.io/
[pusher]: https://pusher.com/
[stream.dotwatcher.cc]: https://github.com/jonheslop/dotwatcher-stream
[contentful api]: https://www.contentful.com/developers/docs/references/content-delivery-api
[trackleaders]: http://trackleaders.com/

## Authentication

Users are able to register with Dotwatcher and assign themselves to a rider's profile. Authentication is handled by [Auth0](http://auth0.com/).

A Auth0 can only be assigned to a single rider profile. When a user "claims" a Dotwacher profile an Auth0 ID is set in the riders table the "claimed_id" column.

## Profiles

Once a user has claimed a profile, they are able to update specific details of theres. These are saved in Auth0 as metadata on the user profile and are requested via the [Auth0 Management API](https://auth0.com/docs/api/management/v2).

The user profile is automatically assigned if signed up via Google or Facebook. Alternatively a user can set their own profile via image upload. The asset is uploaded to [Cloudinary](https://cloudinary.com/), and if successfull the returned data is set in the users Auth0 profile. See [this example](https://cloudinary.com/blog/how_to_build_an_image_library_with_react_cloudinary) for reference.

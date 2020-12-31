import styled from "styled-components";
import Link from "next/link";
import H4 from "@Components/UI/H4";
import H5 from "@Components/UI/H5";
import A from "@Components/UI/A";
import Center from "@Components/UI/Center";
import Image from "next/image";
import dim from "@Utils/dim";
import Newsletter from "@Containers/Newsletter";

import mq from "@Utils/media-query";
import colors from "@Utils/colors";

const Footer = styled.footer`
	> * {
		border-top: 1px solid ${colors.lightgrey};
		padding-top: ${dim()};
		margin-top: ${dim()};
	}
`;

const SubLinks = styled.section`
	display: grid;
	grid-template-columns: repeat(6, 1fr);

	${mq.mdUp`
	  grid-template-columns: repeat(12, 1fr);
  `}
`;

const CenteredList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-around;
`;

const Social = styled.section`
	display: grid;
	grid-template-columns: repeat(6, 1fr);

	${mq.mdUp`
	  grid-template-columns: repeat(12, 1fr);
  `}
`;

const SubLinksList = styled(CenteredList)`
	grid-column: span 6;
	flex-direction: column;
	text-align: center;

	${mq.mdUp`
    grid-column: 4 / span 6;
    flex-direction: row;
	`};
`;

const SocialLinksList = styled(CenteredList)`
	grid-column: 3 / span 2;

	${mq.mdUp`
	  grid-column: 6 / span 2;
  `}
	align-items: center;
`;

const Contributors = styled.div`
	display: grid;
	grid-template-columns: 1;

	${mq.mdUp`
		grid-template-columns: repeat(12, 1fr);
	`}
`;

const ContributorsGrid = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	${mq.mdUp`
		grid-column: 3 / span 8;
		flex-direction: row;
	`}
`;

const Contrinbutor = styled.span`
	& + & {
		padding-top: ${dim(2)};
	}

	&:last-child {
		padding-top: 0;
	}

	${mq.mdUp`
		padding-top: 0 !important;
	`}
`;

const NewsletterSection = styled.section`
	display: grid;
	grid-template-columns: 1;

	${mq.mdUp`
		grid-column-gap: ${dim(4)};
		padding:  0 ${dim(2)};
		grid-template-columns: 40% 60%;
	`}
`;

const FooterComp = () => {
	return (
		<Footer>
			<NewsletterSection>
				<H5>
					DotWatcher is here to showcase the best of long distance
					self-supported bike racing. The DotWatcher Digest is a regular roundup
					of the best content from around the bikepacking webosphere, delivered
					via an exclusive newsletter.
				</H5>
				<Newsletter />
			</NewsletterSection>

			<section>
				<Center>
					<H4>Proudly Supported By:</H4>
				</Center>

				<Contributors>
					<ContributorsGrid>
						<Contrinbutor>
							<a href="https://apidura.com" target="_blank" title="Apidura">
								<Image
									src="/static/icons/apidura.svg"
									width={125}
									height={72}
									title="Apidura"
									alt="Apidura"
								/>
							</a>
						</Contrinbutor>

						<Contrinbutor>
							<a
								href="https://ridewithgps.com"
								target="_blank"
								title="Ride With GPS"
							>
								<Image
									src="/static/icons/ride-with-gps-color.svg"
									width={189}
									height={45}
									title="Ride With GPS"
									alt="Ride With GPS"
								/>
							</a>
						</Contrinbutor>

						<Contrinbutor>
							<a
								href="https://folowmychallange.com"
								title="Follow My Challange"
								target="_blank"
							>
								<Image
									src="/static/images/fmc.svg"
									width={189}
									height={72}
									title="Follow My Challange"
									alt="Follow My Challange"
								/>
							</a>
						</Contrinbutor>

						<Contrinbutor>
							<Link href="/about#contributors" passHref>
								<p>
									<A title="Our Contributors">Our Contributors</A>
								</p>
							</Link>
						</Contrinbutor>
					</ContributorsGrid>
				</Contributors>
			</section>

			<Social>
				<SocialLinksList>
					<li>
						<a
							href="https://twitter.com/dotwatcher"
							target="_blank"
							title="Twitter"
						>
							<Image
								src="/static/icons/twitter.svg"
								width={15}
								height={15}
								alt="Twitter"
								title="Twitter"
							/>
						</a>
					</li>

					<li>
						<a
							href="https://www.facebook.com/Dotwatcher-589592644746030/"
							target="_blank"
							title="Facebook"
						>
							<Image
								src="/static/icons/facebook.svg"
								width={15}
								height={26}
								alt="Facebook"
								title="Facebook"
							/>
						</a>
					</li>

					<li>
						<a
							href="https://www.instagram.com/dotwatcher.cc/"
							target="_blank"
							title="Instagram"
						>
							<Image
								src="/static/icons/instagram.svg"
								width={15}
								height={15}
								alt="Instagram"
								title="Instagram"
							/>
						</a>
					</li>
				</SocialLinksList>
			</Social>
			<SubLinks>
				<SubLinksList>
					<li>
						<Link href="/submissions" passHref>
							<A>
								<H5>Submit to DotWatcher</H5>
							</A>
						</Link>
					</li>

					<li>
						<Link href="/data-policy" passHref>
							<A>
								<H5>Data Policy</H5>
							</A>
						</Link>
					</li>

					<li>
						<A href="mailto:info@dotwatcher.cc">
							<H5>Submit to DotWatcher</H5>
						</A>
					</li>
				</SubLinksList>
			</SubLinks>
		</Footer>
	);
};

export default FooterComp;

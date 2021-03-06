import { FacebookButton, TwitterButton } from "react-social";
import Short from "./short";
import Long from "./long";
import Embed from "./embed";
import Photo from "./photo";
import Quote from "./quote";
import styled from "styled-components";
import mq from "@Utils/media-query";
import dim from "@Utils/dim";
import colors from "@Utils/colors";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import ReturnToTop from "@Components/UI//ReturnTop";

import Button from "@Components/UI/Button";

const PostItem = ({ item, ...props }) => {
	if (!item) return <Short {...props} />;

	if (item.format === "Quote") {
		return <Quote {...props} />;
	} else if (item.format === "Embed") {
		return <Embed data={item} {...props} />;
	} else if (item.format === "Photo") {
		return <Photo data={item} {...props} />;
	} else if (item.format === "Long") {
		return <Long data={item} {...props} />;
	}

	return <Short {...props} />;
};

const Posts = styled.div`
	margin-top: ${dim()};

	${mq.mdUp`
		overflow: scroll;
		max-height: 96vh;
	`};
`;

const Post = styled.div`
	padding-top: ${dim()};
	margin-top: ${dim()};
	border-top: 1px solid ${colors.lightgrey};
`;

const StyledDiv = styled.div`
	position: relative;
`;

const StyledFacebookButton = styled(FacebookButton)`
	display: inline-block;
	background-color: #3b5998;
	border: 0;
	color: #fff;
	font-size: 0.875rem;
	line-height: 1;
	padding: ${dim()};
	margin: 0 ${dim()} ${dim()};
	cursor: pointer;
`;

const StyledTwitterButton = styled(TwitterButton)`
	display: inline-block;
	background-color: #00aced;
	border: 0;
	color: #fff;
	font-size: 0.875rem;
	line-height: 1;
	padding: ${dim()};
	margin: 0 0 ${dim()} ${dim()};
	cursor: pointer;
`;

const Social = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ScrollActions = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: ${dim(2)} 0 ${dim()};
`;

const Feed = ({ posts, handleLoadMore, showLoadMore }) => {
	const ref = useRef(null);

	const scrollTop = e => {
		e.preventDefault();
		if (ref && ref.current) {
			ref.current.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}
	};

	const router = useRouter();

	return (
		<StyledDiv>
			<a id="#events"></a>
			<Posts>
				{posts.map((item, ind) => {
					const query = `?post=${item.sys.id}`;

					const url = `https://dotwatcher.cc/${router.asPath}` + query;
					return (
						<Post key={ind}>
							<a id={item.sys.id}></a>
							{ind === 0 && <div ref={ref} />}

							<PostItem item={item} />

							{console.log(item.sys)}
							<Social>
								<div>
									<Link
										href={`/race/${router.query.slug}?reverse=${router.query.reverse}&post=${item.sys.id}#${item.sys.id}`}
										passHref
									>
										<a>
											{moment(item.sys.firstPublishedAt).format(
												"MMM Do YYYY, hh:mm"
											)}
										</a>
									</Link>
								</div>
								<div>
									<StyledFacebookButton
										url={url}
										appId="2041612559415974"
										windowOptions={[
											"status=0",
											"toolbar=0",
											"width=480",
											"height=350",
											`top=${
												typeof window !== "undefined"
													? window.screen.height / 2 - 175
													: 10
											}px`,
											`left=${
												typeof window !== "undefined"
													? window.screen.width / 2 - 240
													: 10
											}px`
										]}
									>
										Share
									</StyledFacebookButton>
									<StyledTwitterButton
										url={url}
										windowOptions={[
											"status=0",
											"toolbar=0",
											"width=480",
											"height=350",
											`top=${
												typeof window !== "undefined"
													? window.screen.height / 2 - 175
													: 10
											}px`,
											`left=${
												typeof window !== "undefined"
													? window.screen.width / 2 - 240
													: 10
											}px`
										]}
									>
										Tweet
									</StyledTwitterButton>
								</div>
							</Social>
						</Post>
					);
				})}

				<hr />

				<ScrollActions>
					<a href="#!" onClick={scrollTop}>
						Back to the top
					</a>

					{showLoadMore && <Button onClick={handleLoadMore}>Load More</Button>}
				</ScrollActions>
			</Posts>

			<ReturnToTop onClick={scrollTop} title="Scroll to first post">
				<Image src="/static/icons/up-arrow.svg" width={20} height={20} />
			</ReturnToTop>
		</StyledDiv>
	);
};

export default Feed;

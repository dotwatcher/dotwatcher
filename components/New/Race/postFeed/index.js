import { FacebookButton, TwitterButton } from "react-social";
import Short from "./short";
import Long from "./long";
import Embed from "./embed";
import Photo from "./photo";
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
import Center from "@Components/UI/Center";
import H2 from "@Components/UI/H2";

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

const Feed = ({ posts }) => {
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
							<H2>{item.title}</H2>

							<PostItem item={item} />
							<Social>
								<div>
									<Link href={router.asPath + query} passHref>
										<a>
											{moment(item.sys.firstPublishAt).format("MMM Do YYYY")}
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

				<Center>
					<a href="#!" onClick={scrollTop}>
						Back to the top
					</a>
				</Center>
			</Posts>

			<ReturnToTop onClick={scrollTop} title="Scroll to first post">
				<Image src="/static/icons/up-arrow.svg" width={20} height={20} />
			</ReturnToTop>
		</StyledDiv>
	);
};

export default Feed;

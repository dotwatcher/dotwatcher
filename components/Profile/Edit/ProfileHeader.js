import React, { useState } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import { user as userAPI } from "../../../utils/auth";

const Div = styled.div`
	${tachyons}
`;

const A = styled.a`
	${tachyons}
`;

const Button = styled.button`
	${tachyons}

	&:disabled {
		background-color: var(--gray);
		cursor: not-allowed;
		border: none;
	}
`;
const PictureThumb = styled.img`
	${tachyons}
	max-width: 200px;
`;

const getProfilePicture = ({ meta }) => {
	if (!meta) return "/static/empty-profile.png";

	if (meta.user_metadata?.userPicture) {
		return meta.user_metadata.userPicture;
	}

	if (meta.picture) {
		return meta.picture;
	}

	return "/static/empty-profile.png";
};

export default ({ meta, user }) => {
	const profilePicture = getProfilePicture({ meta });

	const [preview, setPreview] = useState(profilePicture);

	const uploadWidget = () => {
		cloudinary.openUploadWidget(
			{
				cloud_name: process.env.CLOUDINARY_NAME,
				upload_preset: process.env.CLOUDINARY_PRESET,
				api_key: process.env.CLOUDINARY_KEY,
				api_secret: process.env.CLOUDINARY_SECRET,
				secure: true
			},
			async (error, result) => {
				if (result) {
					const userPicture = result[0].secure_url;
					setPreview(userPicture);

					await userAPI.update({ id: user.user.sub, data: { userPicture } });

					return;
				}

				console.log(error);
			}
		);
	};

	return (
		<Div mb4 bb bw1 pb4_ns b__light_gray>
			{preview && <PictureThumb src={preview} alt="Thumnail" />}
			<Div mt3>
				<A
					pointer
					near_black
					hover_blue
					underline
					onClick={uploadWidget}
					type="button"
				>
					Update Profile Image
				</A>
			</Div>
			<Div mt3 bt bw1 b__light_gray pt4 mt4>
				{meta && meta.user_metadata?.name ? (
					<Link
						href={`/profile?name=${meta.user_metadata.name}`}
						as={`/profile/${meta.user_metadata.name}`}
						passHref
					>
						<A>
							<Button
								f4
								bg_blue
								hover_bg_dark_blue
								w_
								pv2
								mb3
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
							>
								View my profile
							</Button>
						</A>
					</Link>
				) : (
					<Link href={`/results`} passHref>
						<A>
							<Button
								f4
								bg_blue
								hover_bg_dark_blue
								w_
								pv2
								mb3
								tc
								white
								ttl
								small_caps
								ba
								bw1
								b__blue
								dib
								pointer
							>
								← Find my Profile
							</Button>
						</A>
					</Link>
				)}
			</Div>
		</Div>
	);
};

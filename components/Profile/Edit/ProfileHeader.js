import React, { useState } from "react";
import styled from "styled-components";
import tachyons from "styled-components-tachyons";
import Link from "next/link";
import P from "@Components/UI/P";
import Button from "@Components/UI/Button";
import { user as userAPI } from "@Utils/auth";
import mq from "@Utils/media-query";
import dim from "@Utils/dim";

const Div = styled.div`
	${tachyons}
`;

const PictureThumb = styled.img`
	max-width: 200px;
	border-radius: 100%;
`;

const ButtonsWrapper = styled(Div)`
	${Button} {
		width: 100%;
	}

	${mq.smDown`
		& > * {
			margin-top: ${dim()};
		}
	`}

	${mq.mdUp`
		display: flex;
		justify-content: space-between;
	`}
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

export default ({ meta, user, setshowConnectAccount, disconnectRWGPS }) => {
	const profilePicture = getProfilePicture({ meta });

	const [preview, setPreview] = useState(profilePicture);

	const toggleRWGPSConnect = () => setshowConnectAccount(true);

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
		<Div mb4 bb bw1 pb4 b__light_gray>
			{preview && <PictureThumb src={preview} alt="Thumnail" />}

			<Div mt3>
				<P>
					<a onClick={uploadWidget} type="button">
						Update Profile Image
					</a>
				</P>
			</Div>

			<ButtonsWrapper bt bw1 b__light_gray pt4 mt4>
				<Div>
					{meta && meta.user_metadata?.name ? (
						<Link
							href={`/profile?name=${meta.user_metadata.name}`}
							as={`/profile/${meta.user_metadata.name}`}
							passHref
						>
							<a>
								<Button>View my profile</Button>
							</a>
						</Link>
					) : (
						<Link href={`/results`} passHref>
							<a>
								<Button>← Find my Profile</Button>
							</a>
						</Link>
					)}
				</Div>

				<Div>
					{meta && !meta.user_metadata?.rwgps ? (
						<Button onClick={toggleRWGPSConnect}>
							Connect RideWithGPS Account
						</Button>
					) : (
						<Button onClick={disconnectRWGPS}>
							Disconnect RideWithGPS Account
						</Button>
					)}
				</Div>
			</ButtonsWrapper>
		</Div>
	);
};

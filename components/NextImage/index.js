import PropTypes from 'prop-types';
import NextImage from 'next/image'

const Image = ({ src, ...props }) => {
  const url = src.replace("//images.ctfassets.net", "https://images.ctfassets.net");

  return <NextImage src={url} width={800} height={500} {...props} />
}

Image.propTypes = {
  src: PropTypes.string.isRequired
}

export default Image;
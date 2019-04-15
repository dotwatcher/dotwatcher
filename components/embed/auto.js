import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instagram from 'react-instagram-embed';
import styled from 'styled-components';
import tachyons from 'styled-components-tachyons';

const tweetIdMatch = /status\/(\d+)/i
const youtubeDomain = /youtu.?be./
const youtubeIdMatch = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?/i
const A = styled.a`${tachyons}`;

class AutoEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inBrowser: false
    };
  }

  componentDidMount() {
    this.setState({ inBrowser: true });
  }

  render() {
    const tweetID = tweetIdMatch.exec(this.props.href);
    const youtubeID = youtubeIdMatch.exec(this.props.href);

    if (this.state.inBrowser && this.props.href.includes('twitter') && tweetID) {
      const { TwitterTweetEmbed } = require('react-twitter-embed');
      return <TwitterTweetEmbed tweetId={tweetID[1]} />;
    }
    if (this.state.inBrowser && this.props.href.includes('instagram.com/p/')) {
      return <Instagram url={this.props.href} />;
    }
    if (this.state.inBrowser && youtubeDomain.test(this.props.href)) {
      return <iframe width="560" height="315" style={{ maxWidth: '100%' }} src={`https://www.youtube.com/embed/${youtubeID[1]}`} frameBorder="0" allowFullScreen />;
    }
    console.log(this.props)
    return <A link blue href={this.props.href}>{this.props.children[0].props.value ? this.props.children[0].props.value : this.props.href}</A> ;
  }
}

AutoEmbed.propTypes = {
  href: PropTypes.string.isRequired,
};

export default AutoEmbed;

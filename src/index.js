import React from 'react'
import tags from 'html-tag-names'
import cleanPropsByTag from '@roseys/clean-props-by-tag'
import { omit } from 'ramda'

// mostly from https://github.com/jxnblk/styled-system

export class Tag extends React.Component {
  render() {
    let { innerRef, is, blacklist, theme, ...props } = this.props
    const attr = omit(blacklist, cleanPropsByTag(is, props))

    return React.createElement(is, {
      ref: innerRef,
      ...attr
    })
  }
}

Tag.displayName = 'Clean.div'

Tag.defaultProps = {
  is: 'div',
  blacklist: { dummy: 1 }
}

// Trick styled-components into passing innerRef
Tag.styledComponentId = 'lol'

tags.forEach(tag => {
  Tag[tag] = props => React.createElement(Tag, { is: tag, ...props })
  Tag[tag].displayName = 'Clean.' + tag
})

export default Tag

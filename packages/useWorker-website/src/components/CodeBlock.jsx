import React, { useState } from 'react'
import CodeBlock from '@theme/CodeBlock'

export default ({
  header,
  js,
  jsHighlight,
}) =>  (
    <div className={'code-with-header'}>
      {header && <div className="code-header">{header}</div>}
      <>
        {js && <CodeBlock metastring={jsHighlight}>{js}</CodeBlock>}
      </>
    </div>
)


const styles = {
  responseShown: {
    textAlign: 'right',
    display: 'block',
    borderRadius: '0',
    color: 'var(--custom-primary)',
    borderTop: '1px solid #444',
  },
  responseHidden: {
    textAlign: 'right',
    display: 'block',
    borderBottom: 'none',
    borderRadius: '0 0 4px 4px',
    borderTop: '1px solid #444',
    color: '#ccc',
  },
}

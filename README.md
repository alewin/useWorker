# React hook - Web workers

> useWorker() - Use web workers with react hook

## Usage

```jsx
import React, { Component } from 'react'

import useWorker from 'useworker'

class Example extends Component {
  const fnWorker = useWorker(fn)
  const result = await fnWorker()

  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [alewin](https://github.com/alewin)

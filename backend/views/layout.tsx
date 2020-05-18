import * as React from 'react'


export class Layout extends React.Component<any, {}> {
    [x: string]: any
    constructor(props: any) {
        super(props)
    }
  render() {
    const View = this.props.view

    return (
      <html dir=''>
        <head>
          <meta charSet='utf-8'/>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
          />
          <meta name='robots' content='noindex' />
          <meta name='apple-mobile-web-app-capable' content='yes'/>
          <meta name='mobile-web-app-capable' content='yes' />
          <title>React Application project</title>
          {/* {<script dangerouslySetInnerHTML={{__html: gtm}} />} */}
        </head>

        <body>
          <View {...this.props} />
        </body>
      </html>
    )
  }
}

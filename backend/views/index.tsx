import * as React from 'react'
import {config} from '../config'

export default class Index extends React.Component<{}, {}> {
  render() {
    const js = `window.environment='${config.environment}';`

    return (
      <div id='app'>
        <div className='LoaderContainer'>
          <div className='LoaderContainer__title'>React Application</div>
          <ul className='LoaderContainer__progress'/>
        </div>

        <script dangerouslySetInnerHTML={{__html: js}}/>

        {/* The script has HTTP headers preventing caching, so cache-bust is normally not necessary.
        But include it anyway in case there are corner cases we didn't consider. */}
        <script src={'/js/check-authentication.js?cache-bust=' + Date.now()}/>
      </div>
    )
  }
}

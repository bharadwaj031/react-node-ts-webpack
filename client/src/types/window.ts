
import {compose} from 'redux'

// augment Window definition in TypeScript's built-in lib.es6.d.ts
declare global {
  interface Window {
    // Added by browser (possibly)
    onunhandledrejection: (this: Window, ev: PromiseRejectionEvent) => any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose

    // Custom things we add to "window"
    environment: string
    dataLayer: object[]
    onDataReceived(data: any): Promise<void>
  }
}

import * as React from 'react'
import * as ReactDom from 'react-dom/server'
import Index from './views/index'
import {Layout} from './views/layout'

export const Views = {
    Layout,
    Index,
}

export function renderView<T>(props: T & {view: React.ComponentClass<T>}): string {
  return '<!doctype html>' + ReactDom.renderToStaticMarkup(React.createElement(Views.Layout, props))
}

export function renderStandaloneView<T>(view: React.ComponentClass<T>, props: T): string {
  return '<!doctype html>' + ReactDom.renderToStaticMarkup(React.createElement(view, props))
}

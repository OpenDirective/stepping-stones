import xs, { Stream } from 'xstream'
import { makeDOMDriver, VNode, DOMSource } from '@cycle/dom'
import { makeHTTPDriver, HTTPSource, RequestOptions } from '@cycle/http'

export const drivers : any = {
    DOM: makeDOMDriver('#app'),
    HTTP: makeHTTPDriver()
}

export type DriverSources = {
    DOM : DOMSource
    HTTP : HTTPSource
}

export type DriverSinks = {
    DOM : Stream<VNode>
    HTTP : Stream<RequestOptions>
}

export const driverNames : string[] = Object.keys(drivers)

// Cycle apps (main functions) are allowed to return any number of sinks streams
// This sets defaults for all drivers that are not returned by the app
export const allSinks : (a : Component) => (s : DriverSources) => DriverSinks
    = app => sources => ({
        ...driverNames.map(n => ({ [n]: xs.never() })).reduce(Object.assign, {}),
        ...app(sources)
    })

export type Sources = DriverSources
export type Sinks = Partial<DriverSinks>
export type Component = (s : Sources) => Sinks

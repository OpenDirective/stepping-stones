import xs from 'xstream'
import { run } from '@cycle/run'
import onionify from 'cycle-onionify'

import { allSinks, drivers, Component } from './drivers'
import { App } from './app'

const main : Component = onionify(App)

run(allSinks(main), drivers)

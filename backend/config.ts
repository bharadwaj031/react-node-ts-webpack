export type Environment = 'local' | 'dev' | 'production'

const env = (process.env.CONFIG_ENV || 'local') as Environment

interface Config {
    environment: string
}

const local = {
    environment : 'local'
}
const dev = {
    environment : 'dev'
}
const production = {
    environment : 'production'
}

const configs: {[index in Environment]: Config} = {
    local,
    dev,
    production
}

export const config = configs[env]
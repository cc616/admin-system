import Patterns from './patterns'


export const isUrl = path => Patterns.url.test(path)


export default isUrl

import { isNaN } from 'lodash'

const isPositiveIntegerNumber = (input) => !isNaN(input * 1) && (input % 1 == 0) && (input > -1)

export default isPositiveIntegerNumber
export { isPositiveIntegerNumber as isPositiveIntegerNumber }
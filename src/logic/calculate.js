import operate from './operate';
import isNumber from './isNumber';

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj, buttonName) {
    
    if (buttonName === 'AC') {
        return {
            total: null,
            next: null,
            operation: null,
        };
    }

    if (isNumber(buttonName)) {
        if (buttonName === '0' && obj.next === '0') {
            return {};
        }
    }
}


import * as React from "react";

import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";

import { Big } from "big.js";

export interface AppState {
    total?: any,
    next?: any,
    operation?: any
};

export interface AppProps extends React.Props<App> { }

export class App extends React.Component<AppProps, AppState> {

    public constructor(props: AppProps) {
        super(props);
        this.state = this.initialState();
    }

    private initialState(): AppState {
        return {
            total: null,
            next: null,
            operation: null
        }
    };

    handleClick(buttonName: string) {
        console.log("App::handleClick(): " + buttonName + ' ' + JSON.stringify(this.state));
        this.setState(calculate(this.state, buttonName));
    }

    render() {
        return (
            <div className="component-app">
                <Display value={this.state.next || this.state.total || '0'} />
                <ButtonPanel clickHandler={this.handleClick.bind(this)} />
            </div>
        );
    }
}

//// logic ///////////////////////////////////////////////////////////////////////////////

export function calculate(obj: AppState, buttonName: string) {
    if (buttonName === 'AC') {
        return {
            total: 0,
            next: "",
            operation: ""
        }
    }

    if (isNumber(buttonName)) {
        if (buttonName === '0' && obj.next === '0') {
            return {};
        }
        // If there is an operation, update next
        if (obj.operation) {
            if (obj.next) {
                return { next: obj.next + buttonName };
            }
            return { next: buttonName };
        }
        // If there is no operation, update next and clear the value
        if (obj.next) {
            return {
                next: obj.next + buttonName,
                total: 0,
            };
        }
        return {
            next: buttonName,
            total: 0,
        };

    }

    if (buttonName === '=') {
        if (obj.next && obj.operation) {
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null,
            };
        } else {
            // '=' with no operation, nothing to do
            return {};
        }
    }

    if (buttonName === '+/-') {
        if (obj.next) {
            return { next: (-1 * parseFloat(obj.next)).toString() };
        }
        if (obj.total) {
            return { total: (-1 * parseFloat(obj.total)).toString() };
        }
        return {};
    }

    // User pressed an operation button and there is an existing operation
    if (obj.operation) {
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: '',
            operation: buttonName,
        };
    }

    // no operation yet, but the user typed one

    // The user hasn't typed a number yet, just save the operation
    if (!obj.next) {
        return { operation: buttonName };
    }

    // save the operation and shift 'next' into 'total'
    return {
        total: obj.next,
        next: '',
        operation: buttonName,
    };
}

export default function operate(numberOne: any, numberTwo: any, operation: any) {
    const one = Big(numberOne);
    const two = Big(numberTwo);
    if (operation === '+') {
        return one.plus(two).toString();
    }
    if (operation === '-') {
        return one.minus(two).toString();
    }
    if (operation === 'x') {
        return one.times(two).toString();
    }
    if (operation === '÷') {
        return one.div(two).toString();
    }
    if (operation === '%') {
        return one.mod(two).toString();
    }
    throw Error(`Unknown operation '${operation}'`);
}

export function isNumber(item: string) {
    return !!item.match(/[0-9]+/);
}
import * as React from "react";

import { Display } from "./Display";
import { ButtonPanel } from "./ButtonPanel";

import calculate from "../logic/calculate";

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

    //// render ///////////////////////////////////////////////////////////////////////////////

    render() {
        return (
            <div className="component-app">
                <Display value={this.state.next || this.state.total || '0'} />
                <ButtonPanel clickHandler={this.handleClick.bind(this)} />
            </div>
        );
    }
}

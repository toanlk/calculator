import * as React from "react";

export interface DisplayProps { value: string;}

export class Display extends React.Component<DisplayProps, {}> {
    render() {
        return <div className="component-display">{this.props.value}</div>;
    }
}
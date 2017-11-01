import * as React from "react";

export interface ButtonProps { name: string, clickHandler: (name: string) => void }

export class Button extends React.Component<ButtonProps, {}> {

    handleClick(name: string) {
        this.props.clickHandler(name);
    }

    render() {
        let className = "component-button";

        if (this.props.name == "0") {
            className = className + " wide-button";
        }

        return (
            <div className={className}>
                <button onClick={() => this.handleClick(this.props.name)}>
                    {this.props.name}
                </button>
            </div>
        );
    }
}
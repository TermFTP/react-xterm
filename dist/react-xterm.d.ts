import * as React from "react";
import { ITerminalAddon, ITerminalOptions, Terminal } from "xterm";
import "xterm/css/xterm.css";
export interface IXtermProps extends React.DOMAttributes<{}> {
    onFocusChange?: Function;
    addons?: ITerminalAddon[];
    onScroll?: (e: any) => void;
    onContextMenu?: (e: any) => void;
    options?: ITerminalOptions;
    path?: string;
    className?: string;
    style?: React.CSSProperties;
}
export interface IXtermState {
    isFocused: boolean;
}
export default class XTerm extends React.Component<IXtermProps, IXtermState> {
    xterm: Terminal;
    container: React.RefObject<HTMLDivElement>;
    constructor(props: IXtermProps);
    applyAddon(addon: ITerminalAddon): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getTerminal(): Terminal;
    write(data: any): void;
    writeln(data: any): void;
    focus(): void;
    focusChanged(focused: any): void;
    onInput: (data: any) => void;
    resize(cols: number, rows: number): void;
    setOption(key: string, value: boolean): void;
    refresh(): void;
    onContextMenu(e: any): void;
    render(): JSX.Element;
}
export { Terminal, XTerm };

import * as React from "react";
import { Terminal } from "xterm";
import "../node_modules/xterm/dist/xterm.css";
export interface IXtermProps extends React.DOMAttributes<{}> {
    onChange?: (e: any) => void;
    onInput?: (e: any) => void;
    onFocusChange?: Function;
    addons?: string[];
    onScroll?: (e: any) => void;
    onContextMenu?: (e: any) => void;
    options?: any;
    path?: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
}
export interface IXtermState {
    isFocused: boolean;
}
export default class XTerm extends React.Component<IXtermProps, IXtermState> {
    xterm?: Terminal;
    container: React.RefObject<HTMLDivElement>;
    constructor(props: IXtermProps);
    applyAddon(addon: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    getTerminal(): Terminal | undefined;
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

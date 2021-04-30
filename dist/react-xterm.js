import * as React from "react";
import { Terminal } from "xterm";
import className from "classnames";
import "../node_modules/xterm/css/xterm.css";
export default class XTerm extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.onInput = (data) => {
            this.props.onInput && this.props.onInput(data);
        };
        this.xterm = new Terminal(props.options);
        this.state = {
            isFocused: false,
        };
    }
    applyAddon(addon) {
        this.xterm.loadAddon(addon);
    }
    componentDidMount() {
        var _a, _b, _c;
        (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.addons) === null || _b === void 0 ? void 0 : _b.forEach(this.applyAddon.bind(this));
        this.xterm.open(this.container.current);
        if (this.props.onContextMenu) {
            (_c = this.xterm.element) === null || _c === void 0 ? void 0 : _c.addEventListener("contextmenu", this.onContextMenu.bind(this));
        }
        if (this.props.onInput) {
            this.xterm.onData(this.onInput);
        }
    }
    componentWillUnmount() {
        this.xterm.dispose();
    }
    getTerminal() {
        return this.xterm;
    }
    write(data) {
        this.xterm && this.xterm.write(data);
    }
    writeln(data) {
        this.xterm && this.xterm.writeln(data);
    }
    focus() {
        if (this.xterm) {
            this.xterm.focus();
        }
    }
    focusChanged(focused) {
        this.setState({
            isFocused: focused,
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }
    resize(cols, rows) {
        this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
    }
    setOption(key, value) {
        this.xterm && this.xterm.setOption(key, value);
    }
    refresh() {
        this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
    }
    onContextMenu(e) {
        this.props.onContextMenu && this.props.onContextMenu(e);
    }
    render() {
        const terminalClassName = className("ReactXTerm", this.state.isFocused ? "ReactXTerm--focused" : null, this.props.className);
        return (React.createElement("div", { ref: this.container, className: terminalClassName, style: this.props.style }));
    }
}
export { Terminal, XTerm };

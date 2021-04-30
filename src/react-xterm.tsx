import * as React from "react";
import { ITerminalAddon, ITerminalOptions, Terminal } from "xterm";
import className from "classnames";
import "../node_modules/xterm/css/xterm.css";
// const debounce = require('lodash.debounce');
// import styles from 'xterm/xterm.css';

// require ('xterm/xterm.css');

export interface IXtermProps extends React.DOMAttributes<{}> {
  // onChange?: (e) => void;
  // onInput?: (e) => void;
  onFocusChange?: Function;
  addons?: ITerminalAddon[];
  onScroll?: (e) => void;
  onContextMenu?: (e) => void;
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
  container = React.createRef<HTMLDivElement>();
  constructor(props: IXtermProps) {
    super(props);
    this.xterm = new Terminal(props.options);
    this.state = {
      isFocused: false,
    };
  }

  applyAddon(addon: ITerminalAddon) {
    this.xterm.loadAddon(addon);
  }
  componentDidMount() {
    this.props?.addons?.forEach(this.applyAddon.bind(this));
    this.xterm.open(this.container.current!);
    // this.xterm.on("focus", this.focusChanged.bind(this, true));
    // this.xterm.on("blur", this.focusChanged.bind(this, false));
    if (this.props.onContextMenu) {
      this.xterm.element?.addEventListener(
        "contextmenu",
        this.onContextMenu.bind(this)
      );
    }
    if (this.props.onInput) {
      this.xterm.onData(this.onInput);
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    this.xterm.dispose();
  }

  getTerminal() {
    return this.xterm;
  }

  write(data: any) {
    this.xterm && this.xterm.write(data);
  }
  writeln(data: any) {
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
  onInput = (data) => {
    this.props.onInput && this.props.onInput(data);
  };

  resize(cols: number, rows: number) {
    this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
  }
  setOption(key: string, value: boolean) {
    this.xterm && this.xterm.setOption(key, value);
  }
  refresh() {
    this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
  }

  onContextMenu(e) {
    this.props.onContextMenu && this.props.onContextMenu(e);
  }

  render() {
    const terminalClassName = className(
      "ReactXTerm",
      this.state.isFocused ? "ReactXTerm--focused" : null,
      this.props.className
    );
    return (
      <div
        ref={this.container}
        className={terminalClassName}
        style={this.props.style}
      />
    );
  }
}
export { Terminal, XTerm };

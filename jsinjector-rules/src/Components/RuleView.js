/**
 * Created by carlo on 27/03/2017.
 */

import React, {Component} from "react";
const ace = window.ace;


const styles = {
    matchOptionsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 4,
        backgroundColor: "#A2BCC4",
        height: 30,
        width: 230,
    },
    matchOption: {
        //backgroundColor: "#f00",
        fontSize: 13,
        fontWeight: 700,
    },
    match: {
        marginRight: 10,
        fontSize: 13,
        fontWeight: 700,
    },
};

class RuleBar extends Component {

    constructor(props) {
        super(props);
        const {initialRule} = props;
        this.getRule = this.getRule.bind(this);
        this.onMatchOptionChanged = this.onMatchOptionChanged.bind(this);
        this.state = {
            rule: initialRule,
        };
    }

    getRule() {
        return {
            ...this.state.rule,
            injection: undefined,
        };
    }

    onMatchOptionChanged(event) {
        const match = event.target.value;
        this.setState({rule: {...this.state.rule, match}});
    }

    render() {
        const {removeHandler} = this.props;
        const {rule} = this.state;
        const formID = "match-"+rule.id;
        const disableColor = "rgb(196, 67, 43)";
        const enableColor = "rgb(113, 196, 104)";
        return (
          <div
            style={{
                height: 50,
                width: "98%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => removeHandler(rule.id)}
              style={{
                      backgroundColor: disableColor,
                      border: "none",
                      height: 30,
                      color: "#BED9E2",
                      cursor: "pointer",
                      borderRadius: 4,
                  margin: 0,
                  }}
            >
                Remove
            </button>
            <button
              onClick={() => this.setState({rule: {...rule, enabled: !rule.enabled}})}
              style={{
                      backgroundColor: (rule.enabled ? disableColor : enableColor),
                      border: "none",
                      height: 30,
                      color: "#BED9E2",
                      cursor: "pointer",
                      borderRadius: 4,
                    margin: 0,
                }}
            >
              {rule.enabled ? "Disable" : "Enable"}
            </button>
            <input
              type="text"
              placeholder="Trigger URL"
              value={rule.trigger}
              onChange={(e) => this.setState({rule: {...rule, trigger: e.target.value}})}
              style={{
                  width: 350,
                  height: 27,
                  borderRadius: 4,
                  border: "none",
                  padding: "0 10",
                  color: "#000000",
                  backgroundColor: "#eeeeee",
                  margin: 0,
              }}
            />
            <div style={styles.matchOptionsContainer}>
              <p style={styles.matchOption}>
                <input
                  checked={rule.match === "exact"}
                  onChange={this.onMatchOptionChanged}
                  type="radio" name={formID} value="exact"
                  style={{marginRight: 5}}
                />
                  Exact
              </p>
              <p style={styles.matchOption}>
                <input
                  checked={rule.match === "prefix"}
                  onChange={this.onMatchOptionChanged}
                  type="radio" name={formID} value="prefix"
                  style={{marginRight: 5}}
                />
                  Prefix
              </p>
              <p style={styles.matchOption}>
                <input
                  checked={rule.match === "contained"}
                  onChange={this.onMatchOptionChanged}
                  type="radio" name={formID} value="contained"
                  style={{marginRight: 5}}
                />
                  Contained
              </p>
            </div>
          </div>
        );
    }
}

RuleBar.propTypes = {
    initialRule: React.PropTypes.object.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
};


class RuleView extends Component {

    constructor(props) {
        super(props);
        const {initialRule} = this.props;
        this.editorID = "editor-"+initialRule.id;
        this.getRule = this.getRule.bind(this);
        this.refreshEditor = this.refreshEditor.bind(this);
    }

    refreshEditor() {
        this.editor = ace.edit(this.editorID);
        this.editor.$blockScrolling = 1;
        this.editor.setTheme("ace/theme/monokai");
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.setValue(this.props.initialRule.injection);
        this.editor.clearSelection();
    }

    componentDidMount() {
        this.refreshEditor();
    }

    componentDidUpdate() {
        this.refreshEditor();
    }

    getRule() {
        const injection = this.editor.getValue();
        const rule = this.ruleBar.getRule();
        return {
            ...rule,
            injection,
        };
    }

    render() {
        const {props, editorID} = this;
        const {initialRule, removeHandler} = props;

        return (
          <div
            style={{
                backgroundColor: "#BED9E2",
                height: 300,
                flexDirection: "column",
                margin: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
            }}
          >
            <RuleBar
              initialRule={initialRule}
              removeHandler={removeHandler}
              ref={(r) => this.ruleBar = r}
            />
            <div id={editorID} style={{width: "100%", height: "100%"}}>.</div>
          </div>
        );
    }
}

RuleView.propTypes = {
    initialRule: React.PropTypes.object.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
};

export default RuleView;

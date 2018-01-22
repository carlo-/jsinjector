/**
 * RuleView.js
 *
 * Created by carlo- on 27/03/2017.
 * Copyright © 2018 Carlo Rapisarda. All rights reserved.
 *
 */

import React, {Component} from "react";
const ace = window.ace;


const styles = {
    ruleView: {
        backgroundColor: "#BED9E2",
        height: 300,
        flexDirection: "column",
        margin: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
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
        fontSize: 13,
        fontWeight: 700,
    },
    match: {
        marginRight: 10,
        fontSize: 13,
        fontWeight: 700,
    },
    ruleBar: {
        height: 50,
        width: "98%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    removeButton: {
        backgroundColor: "rgb(196, 67, 43)",
        border: "none",
        height: 30,
        color: "#BED9E2",
        cursor: "pointer",
        borderRadius: 4,
        margin: 0,
    },
    enableButton: (enabled) => ({
        backgroundColor: (enabled ? "rgb(196, 67, 43)" : "rgb(113, 196, 104)"),
        border: "none",
        height: 30,
        color: "#BED9E2",
        cursor: "pointer",
        borderRadius: 4,
        margin: 0,
    }),
    triggerField: {
        width: 350,
        height: 27,
        borderRadius: 4,
        border: "none",
        padding: "0 10",
        color: "#000000",
        backgroundColor: "#eeeeee",
        margin: 0,
    },
};


class RuleBar extends Component {

    constructor(props) {
        super(props);
        const {initialRule} = props;
        this.getRule = this.getRule.bind(this);
        this.onMatchOptionChanged = this.onMatchOptionChanged.bind(this);
        this.state = {rule: initialRule};
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
        return (
          <div style={styles.ruleBar}>
            <button
              onClick={() => removeHandler(rule.id)}
              style={styles.removeButton}
            >
                Remove
            </button>
            <button
              onClick={() => this.setState({rule: {...rule, enabled: !rule.enabled}})}
              style={styles.enableButton(rule.enabled)}
            >
              {rule.enabled ? "Disable" : "Enable"}
            </button>
            <input
              type="text"
              placeholder="Trigger URL"
              value={rule.trigger}
              onChange={(e) => this.setState({rule: {...rule, trigger: e.target.value}})}
              style={styles.triggerField}
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
        return {...rule, injection};
    }

    render() {
        const {initialRule, removeHandler} = this.props;
        return (
          <div style={styles.ruleView}>
            <RuleBar
              initialRule={initialRule}
              removeHandler={removeHandler}
              ref={(r) => this.ruleBar = r}
            />
            <div id={this.editorID} style={{width: "100%", height: "100%"}}>.</div>
          </div>
        );
    }
}

RuleView.propTypes = {
    initialRule: React.PropTypes.object.isRequired,
    removeHandler: React.PropTypes.func.isRequired,
};

export default RuleView;

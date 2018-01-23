/**
 * App.js
 *
 * Created by carlo- on 21/01/2018.
 * Copyright © 2018 Carlo Rapisarda. All rights reserved.
 *
 */

import React, {Component} from "react";
import _ from "lodash";

//noinspection JSUnresolvedVariable
import {ModalManager} from "react-dynamic-modal";
import AlertModal from "./Components/AlertModal";
import RulesPanel from "./Components/RulesPanel";

import "./App.css";
import * as util from "./Utilities";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {rules: [], savedRules: []};
        this.handleRemoveRule = this.handleRemoveRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);
        this.handleSaveRules = this.handleSaveRules.bind(this);
        this.handleImportRules = this.handleImportRules.bind(this);
        this.handleExportRules = this.handleExportRules.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
        this.setupRulesImport = this.setupRulesImport.bind(this);
        this.setupRulesMonitor = this.setupRulesMonitor.bind(this);

        this.setupRulesImport();
        this.setupRulesMonitor();

        if (!util.isDevBuild()) {
            util.safari.self.addEventListener("message", this.getAnswer, false);
        }
    }

    setupRulesMonitor() {
        setInterval(() => {
            if (this.rulesPanel) {
                const currentRules = this.rulesPanel.getRules();
                const {savedRules} = this.state;
                const changed = !(_.isEqual(currentRules, savedRules));
                this.rulesPanel.rulesChanged(changed);
            }
        }, 800);
    }

    setupRulesImport() {

        const invalidRules = () => {
            this.openModal({
                title: "Invalid input file!",
                subtitle: null,
                dismissable: true,
            });
        };

        this.fileInput = window.document.getElementById("fileInput");
        this.fileInput.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedRules = JSON.parse(e.target.result);
                    if (util.isValidRules(importedRules)) {
                        this.setState({rules: importedRules});
                    } else {
                        invalidRules();
                    }
                } catch (e) {
                    invalidRules();
                }
            };
            reader.readAsText(file);
        };
    }

    getAnswer(event) {
        if (event.name === "receivedRules" && event.message) {
            let rules = JSON.parse(event.message) || [];
            util.log("receivedRules", rules);

            if (rules.length === 0) {
                rules = [util.newRule()];
            }

            this.setState({rules, savedRules: rules});

        } else if (event.name === "savedRules") {
            util.log("savedRules");
            this.closeModal();
            this.setState({savedRules: this.state.rules});
        }
    }

    loadRules() {
        if (!util.isDevBuild()) {
            util.safari.self.tab.dispatchMessage("getRules", null);
        } else {
            // Simulate answer from extension
            this.getAnswer({name: "receivedRules", message: "[]"});
        }
    }

    componentDidMount() {
        this.loadRules();
    }

    _renderContent() {
        const {rules} = this.state;
        return (
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <RulesPanel
              initialRules={rules}
              ref={(ref) => this.rulesPanel = ref}
              onRemove={this.handleRemoveRule}
              onAdd={this.handleAddRule}
              onSave={this.handleSaveRules}
              onImport={this.handleImportRules}
              onExport={this.handleExportRules}
            />
          </div>
        );
    }

    openModal(config = {title: "Loading...", subtitle: null, dismissable: true}) {
        ModalManager.open(
          <AlertModal
            title={config.title}
            subtitle={config.subtitle}
            onRequestClose={() => config.dismissable}
          />
        );
    }

    closeModal() {
        ModalManager.close();
    }

    render() {
        return (
          <div className="App">

            <div className="App-header">
              <img src={"logo.svg"} className="App-logo" alt="logo"/>
              <h2>jsInjector</h2>
              <h5 style={{marginTop: -10}}>
                {util.VERSION} | <a href={util.GITHUB_PAGE} target="_blank">about</a>
              </h5>
            </div>

            {this._renderContent()}

          </div>
        );
    }

    handleImportRules() {
        this.fileInput.click();
    }

    handleExportRules() {
        const rules = this.rulesPanel.getRules();
        if (!util.isValidRules(rules)) {
            alert("One or more rules are not valid!");
            return;
        }
        this.setState({rules});
        const rulesString = JSON.stringify(rules);
        util.triggerFileDownload("jsInjectorRules.json", rulesString);
    }

    handleSaveRules() {
        const rules = this.rulesPanel.getRules();
        if (!util.isValidRules(rules)) {
            alert("One or more rules are not valid!");
            return;
        }
        this.setState({rules});
        this.openModal({
            title: "Saving...", subtitle: null, dismissable: false,
        });
        setTimeout(() => {
            if (!util.isDevBuild()) {
                util.safari.self.tab.dispatchMessage("saveRules", JSON.stringify(rules));
            } else {
                // Simulate answer from extension
                this.getAnswer({name: "savedRules", message: null});
            }
        }, 700);
        util.log("saveRules");
    }

    handleRemoveRule(ruleID) {
        if (confirm("Are you sure you want to remove this rule?\n(Rule ID: " + ruleID + ")")) {
            let rules = this.rulesPanel.getRules();
            rules = rules.filter((r) => r.id !== ruleID);
            this.setState({rules});
        }
    }

    handleAddRule() {
        const rules = this.rulesPanel.getRules();
        this.setState({
            rules: [util.newRule(), ...rules],
        });
    }
}

App.propTypes = {
    addCategory: React.PropTypes.func,
    addPoint: React.PropTypes.func,
    categories: React.PropTypes.object,
    submissions: React.PropTypes.object,
    user: React.PropTypes.object,
};

export default App;

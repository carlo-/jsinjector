/* global process */
//noinspection JSUnresolvedVariable
import React, {Component} from "react";
import {ModalManager} from "react-dynamic-modal";
import _ from "lodash";
const safari = window.safari;

//noinspection JSUnresolvedVariable
//import logo from "./logo.svg";
import "./App.css";

import AlertModal from "./Components/AlertModal";
import RulesPanel from "./Components/RulesPanel";

const isDevBuild = () => (
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
);

const triggerFileDownload = (filename, rawText) => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(rawText));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

// TODO: Improve checks
const isValidRules = (rules) => (
    rules &&
    (typeof rules === "object")
);

const newRule = () => {
    const id = _.random(0,100000000000000000) + "";
    return {
        enabled: true,
        match: "exact",
        trigger: "",
        injection: "// Rule ID: "+id+"\n// Code to be injected here...",
        id,
    };
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {rules: []};
        this.handleRemoveRule = this.handleRemoveRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);
        this.handleSaveRules = this.handleSaveRules.bind(this);
        this.handleImportRules = this.handleImportRules.bind(this);
        this.handleExportRules = this.handleExportRules.bind(this);
        this.getAnswer = this.getAnswer.bind(this);
        this.setupRulesImport = this.setupRulesImport.bind(this);

        this.setupRulesImport();

        if (!isDevBuild()) {
            safari.self.addEventListener("message", this.getAnswer, false);
        }
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
                    if (isValidRules(importedRules)) {
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
            console.log("receivedRules", rules);

            if (rules.length === 0) {
                rules = [newRule()];
            }

            this.setState({rules});

        } else if (event.name === "savedRules") {
            console.log("savedRules");
            this.closeModal();
        }
    }

    loadRules() {
        if (!isDevBuild()) {
            safari.self.tab.dispatchMessage("getRules", null);
        } else {
            this.setState({rules: [newRule()]});
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
              <h2>jsInjector rules</h2>
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
        this.setState({rules});
        const rulesString = JSON.stringify(rules);
        triggerFileDownload("jsInjectorRules.json", rulesString);
    }

    handleSaveRules() {
        const rules = this.rulesPanel.getRules();
        this.setState({rules});
        this.openModal({
            title: "Saving...", subtitle: null, dismissable: false,
        });
        setTimeout(() => {
            if (!isDevBuild()) {
                safari.self.tab.dispatchMessage("saveRules", JSON.stringify(rules));
            }
        }, 1000);
        console.log("saveRules");
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
            rules: [
                newRule(),
                ...rules,
            ],
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

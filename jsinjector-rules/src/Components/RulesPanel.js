/**
 * RulesPanel.js
 *
 * Created by carlo- on 27/03/2017.
 * Copyright © 2018 Carlo Rapisarda. All rights reserved.
 *
 */

import React, {Component} from "react";
import RuleView from "./RuleView";


const styles = {
    container: {
        width: 775,
        marginTop: 15,
    },
    largeAddButton: {
        height: 30,
        marginBottom: 15,
        borderRadius: 4,
        backgroundColor: "#658E9C",
        border: "none",
        color: "#BED9E2",
        padding: "0 10px",
        textDecoration: "none",
        cursor: "pointer",
    },
    noRules: {
        color: "#BED9E2",
    },
    rulesContainer: {
        backgroundColor: "#658E9C",
        borderColor: "#658E9C",
        borderStyle: "solid",
        borderWidth: 15,
        borderRadius: 4,
    },
};


class RulesPanel extends Component {

    constructor(props) {
        super(props);
        this.cellsRefs = [];
        this.getRules = this.getRules.bind(this);
        this.rulesChanged = this.rulesChanged.bind(this);
    }

    getRules() {
        return this.cellsRefs.map((cell) => cell.getRule());
    }

    rulesChanged(changed) {
        if (this.saveButton) {
            this.saveButton.style.setProperty("background-color", (
                changed ? "rgb(113, 196, 104)" : styles.largeAddButton.backgroundColor
            ));
        }
    }

    render() {
        const props = this.props;
        this.cellsRefs = [];

        const cells = props.initialRules.map((rule) => (
          <RuleView
            ref={(ref) => ref && this.cellsRefs.push(ref)}
            removeHandler={props.onRemove}
            initialRule={rule}
            key={rule.id}
          />
        ));

        return (
          <div style={styles.container}>

            <div>
              <button onClick={props.onAdd} style={styles.largeAddButton}>
                  Add new rule
              </button>
              <button onClick={props.onSave} style={styles.largeAddButton} ref={(r) => this.saveButton = r}>
                  Save rules
              </button>
              <button onClick={props.onImport} style={styles.largeAddButton}>
                  Import rules
              </button>
              <button onClick={props.onExport} style={styles.largeAddButton}>
                  Export rules
              </button>
            </div>

            <div style={styles.rulesContainer}>
              {(cells.length > 0) ? (
                cells
              ) : (
                <p style={styles.noRules}>No rules!</p>
              )}
            </div>
          </div>
        );
    }
}

RulesPanel.propTypes = {
    initialRules: React.PropTypes.array.isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onExport: React.PropTypes.func.isRequired,
    onImport: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
};

export default RulesPanel;

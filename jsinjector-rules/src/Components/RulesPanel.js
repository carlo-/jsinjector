/**
 * Created by carlo on 27/03/2017.
 */

//noinspection JSUnresolvedVariable
import React, {Component} from "react";
import RuleView from "./RuleView";

const styles = {
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
    smallAddButton: {
        height: 30,
        width: 65,
        marginLeft: 30,
        borderRadius: 4,
        backgroundColor: "#658E9C",
        border: "none",
        color: "#BED9E2",
        textDecoration: "none",
        cursor: "pointer",
    },
    cancelButton: {
        height: 30,
        width: 65,
        borderRadius: 4,
        backgroundColor: "#658E9C",
        border: "none",
        color: "#BED9E2",
        textDecoration: "none",
        cursor: "pointer",
    },
    genericField: {
        height: 40,
        borderRadius: 4,
        marginBottom: 5,
        padding: "0 10px",
        border: "none",
        color: "#000000",
        backgroundColor: "#eeeeee",
    },
    container: {
        backgroundColor: "#658E9C",
        height: 360,
        marginTop: 15,
        borderColor: "#658E9C",
        borderStyle: "solid",
        borderWidth: 15,
        borderRadius: 4,
    },
    noRules: {
        color: "#BED9E2",
    },
};


class RulesPanel extends Component {

    constructor(props) {
        super(props);
        this.getRules = this.getRules.bind(this);
    }

    getRules() {
        return this.cellsRefs.map((cell) => cell.getRule());
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
          <div style={{width: 775, marginTop: 15}}>

            <div>
              <button onClick={props.onAdd} style={styles.largeAddButton}>
                      Add new rule
                  </button>
              <button onClick={props.onSave} style={styles.largeAddButton}>
                      Save rules
                  </button>
              <button onClick={props.onImport} style={styles.largeAddButton}>
                      Import rules
                  </button>
              <button onClick={props.onExport} style={styles.largeAddButton}>
                      Export rules
                  </button>
            </div>

            <div
              style={{
                  backgroundColor: "#658E9C",
                  borderColor: "#658E9C",
                  borderStyle: "solid",
                  borderWidth: 15,
                  borderRadius: 4,
              }}
            >
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
    onSave: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onImport: React.PropTypes.func.isRequired,
    onExport: React.PropTypes.func.isRequired,
};


export default RulesPanel;

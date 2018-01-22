/**
 * Created by carlo on 05/04/2017.
 */

import React,{Component} from "react";
import {Modal, Effect} from "react-dynamic-modal";

const styles = {
    modal: {
        content: {
            width: null,
            display: "inline-block",
        },
        overlay: {
            textAlign: "center",
        },
    },
    title: {
        textAlign: "center",
        marginRight: 15,
        marginLeft: 15,
    },
};

class AlertModal extends Component{
    render(){
        const { title, subtitle, onRequestClose } = this.props;
        return (
          <Modal
            style={styles.modal}
            onRequestClose={onRequestClose}
            effect={Effect.Fall}
          >
            <h1 style={styles.title}>{title}</h1>
            <h3 style={styles.title}>{subtitle}</h3>
          </Modal>
        );
    }
}

AlertModal.propTypes = {
    onRequestClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
};

export default AlertModal;

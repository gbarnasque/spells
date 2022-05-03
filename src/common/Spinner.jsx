import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/Modal';


import './Spinner.css';

class Spinner extends React.Component {

    render() { 
        return (
        <Modal
        {...this.props}
        show={this.props.spinner.show}
        size="sm"
        centered
        title={"Loading..."}
        >
            <Modal.Body className="spinner text-center">
                <div>Loading...</div>
                <i className="fa fa-spinner fa-spin" />
            </Modal.Body>
        </Modal>
        
        );
    }
}
    
function mapStateToProps(state){
    return { spinner: state.spinner };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
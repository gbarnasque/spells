import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Button, Card } from 'react-bootstrap/';
import { Link } from 'react-router-dom'

import './SpellsList.css';
import { getSpells, deleteSpell } from './SpellsActions';
import spellImage from '../images/spell_image.jpg';
import { showSpinner } from '../common/SpinnerActions';
import Modal from 'react-bootstrap/Modal';

class SpellsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmDeletion: false,
      spellToDelete: null,
    }

    this.showModalConfirmationDeletion = this.showModalConfirmationDeletion.bind(this);
    this.handleDeleteSpell = this.handleDeleteSpell.bind(this);
    this.closeModalConfirmationDeletion = this.closeModalConfirmationDeletion.bind(this);
  }

  componentDidMount() {
    this.props.getSpells();
    this.props.showSpinner(true);
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
        this.props.showSpinner(false);
        this.setState({...this.state, showConfirmDeletion: false});
    }
  }

  closeModalConfirmationDeletion() {
    this.setState({...this.state, showConfirmDeletion: false});
  }

  showModalConfirmationDeletion(spell) {
    this.setState({spellToDelete: spell, showConfirmDeletion: true});
  }
  
  handleDeleteSpell() {
    this.props.deleteSpell(this.state.spellToDelete);
  }

  renderCards() {
    const spells = this.props.spells.list || [];
    return spells.map(s => (
      <Col key={s.id} className='card-col'>
        <Card>
          <Link to={`/spell/view/${s.id}`}>
            <Card.Img variant="top" src={spellImage} style={{ maxHeight: '50%'}} />
          </Link>
          <Card.Body>
            <Link to={`/spell/view/${s.id}`} className='link-card-body'>
              <Card.Title as='h2' className='text-center'>
                {s.name}
              </Card.Title>
            </Link>
          </Card.Body>
          <Card.Body className='text-center card-botom'>
            <Link className='btn btn-warning' to={`/spell/edit/${s.id}`}>
              <i className='fa fa-pencil'></i>
            </Link>
            <Button variant='danger' onClick={() => this.showModalConfirmationDeletion(s)}>
              <i className='fa fa-trash-o'></i>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    )); 
  }

  render() {
    return (
      <React.Fragment>
        <Row className='row-create-new'>
          <div className='text-center'>
            <Link to={`/spell/create`} className='btn btn-primary btn-create-new'>Create new</Link>
          </div>
        </Row>
        <Row xs={1} sm={2} md={3} lg={4}>
          {this.renderCards()}
        </Row>
        <Modal
        show={this.state.showConfirmDeletion}
        size="lg"
        centered
        title={"Confirm Deletion"}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Confirm Deletion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>
                Are you sure you want to delete the Spell <span style={{fontWeight: '700'}}>{this.state.spellToDelete?.name}</span>?
              </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={this.handleDeleteSpell}>Confirm</Button>
            <Button variant='primary' onClick={this.closeModalConfirmationDeletion}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return { spells: state.spells };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSpells, deleteSpell, showSpinner }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsList);

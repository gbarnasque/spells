import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Button, Card } from 'react-bootstrap/';
import { Link } from 'react-router-dom'

import './SpellsList.css';
import { getSpells, deleteSpell } from './SpellsActions';
import spellImage from '../images/spell_image.jpg';

class SpellsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSpells();
  }

  teste(a) {
    console.log('teste');
  }

  routeChange(id) {
   // const location = useLocation();
    console.log(this.props.location);
    this.props.viewSpell(id)
   // window.location.href = window.location.href + 'spell/' + id; 
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
            {/* <Button className='btn btn-warning' onClick={() => this.teste(s)}>
              <i className='fa fa-pencil'></i>
            </Button> */}
            <Button className='btn btn-danger' onClick={() => this.props.deleteSpell(s)}>
                  <i className='fa fa-trash-o'></i>
              </Button>
          </Card.Body>
        </Card>
      </Col>
    )); 
  }

  renderRows() {
    const spells = this.props.spells.list || [];
    return spells.map(s => (
      <tr key={s.id}>
          <td>{s.createdAt}</td>
          <td>{s.name}</td>
          <td>{s.type}</td>
          <td>
              <Button className='btn btn-warning' onClick={() => this.teste(s)}>
                  <i className='fa fa-pencil'></i>
              </Button>
              <Button className='btn btn-danger' onClick={() => this.teste(s)}>
                  <i className='fa fa-trash-o'></i>
              </Button>
          </td>
      </tr>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Created At</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th className='table-actions'>Ações</th>
                  </tr>
              </thead>
              <tbody>
                  {this.renderRows()}
              </tbody>
          </table>
          {/* <Button variant="primary" className="float-end" onClick={() => this.teste()}>Create new</Button> */}
        </div>
        <Row className='row-create-new'>
          <div className='text-center'>
            <Link to={`/spell/create`} className='btn btn-primary btn-create-new'>Create new</Link>
          </div>
        </Row>
        <Row xs={1} sm={2} md={3} lg={4}>
          {this.renderCards()}
        </Row>
      </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return { spells: state.spells };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSpells, deleteSpell }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsList);

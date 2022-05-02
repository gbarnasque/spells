import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';

import { fetchSpellInfo, createSpell, editSpell } from './SpellsActions';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function getValueDate(date) {
  return date.split('T')[0];
}

class Spell extends React.Component {
  constructor(props) {
    super(props);
   

    const canEdit = !this.props.router.location.pathname.includes('view');
    const newSpell = this.props.router.location.pathname.includes('create');
    const spell = {
      id: this.props.router.location.pathname.split('/')[3] || -1,
      name: '',
      type: '',
      createdAt: '',
    }
    
    this.state = {
     canEdit: canEdit,
     newSpell: newSpell,
     spell: spell,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSpellNameChange = this.handleSpellNameChange.bind(this);
    this.handleSpellTypeChange = this.handleSpellTypeChange.bind(this);
    this.handleSpellcreatedAtChange = this.handleSpellcreatedAtChange.bind(this);
  }

  componentDidMount() {
    if(this.state.spell.id !== -1) {
      this.props.fetchSpellInfo(this.state.spell);
    }
      //this.setState({...this.state, spell: this.props.spell});
      console.log('diff', this.state.spell, this.props.spell);
    
    //console.log('state', this.state);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.spell !== this.props.spell) {
      this.setState({...this.state, spell: this.props.spell});
      console.log('update', this.props.spell);
    }
  }

  handleSpellNameChange = (event) => {this.setState({spell: {...this.state.spell, name: event.target.value}}); console.log('SpellName', this.state.spell.name)};
  handleSpellTypeChange = (event) => {this.setState({spell: {...this.state.spell, type: event.target.value}}); console.log('SpellType', this.state.spell.type)};
  handleSpellcreatedAtChange = (event) => {this.setState({spell: {...this.state.spell, createdAt: new Date(event.target.value).toISOString()}}); console.log('SpellCreatedAt', this.state.spell.createdAt)};

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.newSpell) {
      console.log('create');
      this.props.createSpell(this.state.spell);
    }
    else if(this.state.canEdit) {
      console.log('edit');
      this.props.editSpell(this.state.spell);
    }
    console.log('FinalState', this.state.spell);
  }

  render() {
    if(this.props.redirect) {
      this.props.router.navigate('/');
    }
    else {
      return (
        <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='formSpellName'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    className='form-control'
                    placeholder='Spell Name'
                    type='text'
                    value={this.state.spell?.name}
                    onChange={this.handleSpellNameChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formSpellType'>
                <Form.Label>Type:</Form.Label>
                <Form.Control
                    className='form-control'
                    placeholder='Spell Type'
                    type='text'
                    value={this.state.spell?.type}
                    onChange={this.handleSpellTypeChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formSpellCreatedAt'>
                <Form.Label>Created At:</Form.Label>
                <Form.Control
                    className='form-control'
                    type='date'
                    placeholder='03/03/2022'
                    value={getValueDate(this.state.spell?.createdAt)}
                    onChange={this.handleSpellcreatedAtChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!this.state.canEdit} className="float-end">Submit</Button>
          </Form>
        </React.Fragment>
      )
    }
  }
}

function mapStateToProps(state){
  return { spell: state.spells.spell, redirect: state.spells.redirect };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSpellInfo, createSpell, editSpell }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Spell));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { fetchSpellInfo, createSpell, editSpell } from './SpellsActions';
import { showSpinner } from '../common/SpinnerActions';
import './Spell.css';

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
      createdAt: new Date().toISOString(),
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
    this.handleButtonEdit = this.handleButtonEdit.bind(this);
  }

  componentDidMount() {
    if(this.state.spell.id !== -1) {
      this.props.showSpinner(true);
      this.props.fetchSpellInfo(this.state.spell);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.spell !== this.props.spell) {
      this.setState({...this.state, spell: this.props.spell});
      this.props.showSpinner(false);
    }
  }

  handleSpellNameChange = (event) => this.setState({spell: {...this.state.spell, name: event.target.value}}); 
  handleSpellTypeChange = (event) => this.setState({spell: {...this.state.spell, type: event.target.value}}); 
  handleSpellcreatedAtChange = (event) => this.setState({spell: {...this.state.spell, createdAt: new Date(event.target.value).toISOString()}});

  validateSpell() {
    if(this.state.spell.name.length === 0) {
      const toastId = 'invalid_spell_name';
      toast.info('Spell cannot have empty name.',{toastId: toastId, autoClose: 2000});
      return false;
    }
    if(this.state.spell.type.length === 0) {
      const toastId = 'invalid_spell_type';
      toast.info('Spell cannot have empty type.', {toastId: toastId, autoClose: 2000});
      return false;
    }

    return true;
  }

  handleButtonEdit(e) {
    e.preventDefault();
    this.props.router.navigate(`/spell/edit/${this.state.spell.id}`);
    this.setState({...this.state, canEdit: true});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.showSpinner(true);
    if(this.state.newSpell) {
      if(this.validateSpell())
        this.props.createSpell(this.state.spell);
      else
        this.props.showSpinner(false);
    }
    else if(this.state.canEdit) {
      this.props.editSpell(this.state.spell);
    }
  }

  render() {
    const { redirect } = this.props;
    if(redirect) {
      this.props.router.navigate('/');
    }
    else {
      return (
        <React.Fragment>
        <Form onSubmit={this.handleSubmit} className='spell-form'>
            <Form.Group className='mb-3' controlId='formSpellName'>
                <Form.Label>Name<span className='color-red'>*</span>:</Form.Label>
                <Form.Control
                    className='form-control'
                    placeholder='Spell Name'
                    type='text'
                    value={this.state.spell?.name}
                    onChange={this.handleSpellNameChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formSpellType'>
                <Form.Label>Type<span className='color-red'>*</span>:</Form.Label>
                <Form.Control
                    className='form-control'
                    placeholder='Spell Type'
                    type='text'
                    value={this.state.spell?.type}
                    onChange={this.handleSpellTypeChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formSpellCreatedAt'>
                <Form.Label>Creation Date:</Form.Label>
                <Form.Control
                    className='form-control'
                    type='date'
                    placeholder='03/03/2022'
                    value={getValueDate(this.state.spell?.createdAt)}
                    onChange={this.handleSpellcreatedAtChange}
                    disabled={!this.state.canEdit}/>
            </Form.Group>
            <Button hidden={this.state.canEdit} onClick={this.handleButtonEdit} className="btn btn-minimalist float-end">Edit</Button>
            <Button type="submit" hidden={!this.state.canEdit} className="btn btn-minimalist float-end">Submit</Button>
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
  return bindActionCreators({ fetchSpellInfo, createSpell, editSpell, showSpinner }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Spell));

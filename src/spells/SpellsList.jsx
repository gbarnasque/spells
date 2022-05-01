import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

import { getSpells } from './SpellsActions';

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

  renderRows() {
    const spells = _.orderBy(this.props.spells.list, 'name', 'asc') || [];
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
          <Button variant="primary" className="float-end" onClick={() => this.teste()}>Create new</Button>
        </div>
      </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return { spells: state.spells };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSpells }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellsList);

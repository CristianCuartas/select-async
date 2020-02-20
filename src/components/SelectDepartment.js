import React from 'react';
import PropTypes, { func } from 'prop-types';

class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.countryId,
    valueDepartment: this.props.value
  };

  static getDerivedStateFromProps(props, state) {
    if (props.countryId !== state.id) {
      return {
        id: props.countryId
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.countryId !== prevProps.countryId) {
      this.getDataDepartment();
    }
  }

  getDataDepartment = () => {
    fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/departments/country/${this.state.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODIyNDE5NDgsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiJiNDg1MDUyNS1hZDQ2LTRjNTctYjY4Zi04ZjI5OWMyMjA0YjQiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.BpwElFYfnAu3JthVf14bOJTQL4HDkosyUMXmX1ihFgIvAmKSBmRK9MTSP30PX-FwT4mWIMPmZ73Rla1i-VYfHVUjmLj7m3O1LGoYuXmeeJZwqhCDmzSEK_RHZcvf72B9ydtEc71SQFxvlFG2_Cc0jcUi3x2AFGi7GSPFQm5ipiSGfdHqBl0WP9eSNmw5tEKEOkbv5FpSeYr_s1mHIo4AQ9oAoS2IOtWHJ96-jun00f7feO4G36cYgt1vVIvkIh47rgoSShHsD2wrjixtnwUx9fgPcyFBJeDKm1Y1dcJ8BaMrtBHLXa5bGWnL6W6zUA7WrT-03NOvvJpigrTOb6rx9Q'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataDepartment: data
        });
      })
      .catch(err => {
        console.log('Error', err);
        this.setState({
          dataDepartment: []
        });
      });
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          value={this.props.values}
          className={this.props.className}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataDepartment.map((aux, id) => {
            return (
              <option key={id} value={aux.id}>
                {aux.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

SelectDepartment.propTypes = {
  id: PropTypes.string.isRequired
};

export default SelectDepartment;

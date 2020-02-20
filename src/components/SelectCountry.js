import React from 'react';
import PropTypes from 'prop-types';
class SelectCountry extends React.Component {
  state = {
    dataCountry: []
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/countries/active`,
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
          dataCountry: data
        });
      });
  };

  handleChange = value => {
    this.props.onChange('countryId', value);
  };

  handleBlur = () => {
    this.props.onBlur('countryId', true);
  };

  render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          className={this.props.className}
        >
          <option value={''}>-- Seleccione --</option>
          {this.state.dataCountry.map((aux, id) => {
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
SelectCountry.propTypes = {
  t: PropTypes.any
};

export default SelectCountry;

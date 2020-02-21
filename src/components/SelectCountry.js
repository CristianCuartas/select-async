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
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODIzMjY2MjAsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiIzMWNlY2UzYy1jZWNiLTQyZTItYTk1Zi0yOWRjM2E0OWRjZWYiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.WvZA9ih45X5yvU4GcZz0wF2hQdam8yW5YoNx_hxfhK-ft8bjO83jCS6uaTH5PfWX9eNkLQ4m429JhwecvqKjlo2eA0iz6XjqdqSGOWCi9_YE_bPsZfA5a_BCsLXhRzQ3t1ICoAjkOML6DF8WYU7ZHGtTPJ4An8apg8ow11eiAzsOSLZ9cwK12Maxpp6ccrv_HMEKhZPLYDo6Id_1jzQmCLEYi1yJlmBOY1PjpA4vPfrkpKs09XLP8QVo3Jb0U1Au4YUiEOkb5o17fehGlGn_Hu0ULIQEfBJ51Ub0KrVrFl7tyqNKkD5vGO9bjVJqCmlQxFDXEL9cO0ORHA29ruZW6A'
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

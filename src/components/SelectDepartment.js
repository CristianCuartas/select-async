import React from 'react';
import PropTypes from 'prop-types';

class SelectDepartment extends React.Component {
  state = {
    dataDepartment: [],
    id: this.props.countryId
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
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODIxNTM3MjgsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiI1OWY0ZDdiNC04ZGM4LTQ3YjQtOGFkNS0zNzMwOTdkYjE0Y2QiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.bqde3JpDwPy7n8Bl1_55kLbG8pSDeAtu8XTnyhGUJEOSe4ft-e_8M0-dsPeV4SziS3CJqvPVtSUiJLBEENFbgEfaG_rtFskv2SgIfGNEp_Jyz0T6MeAMj4le_uj0blzuFXFaAyvzL88EPP2MeS6ykE9u-6vWmZVSkkg7L5hrx6sOYNVvwnnb3Nvnhh4Kht9Qk45eRvc0NTXIKDQrg72pHQ3W9VoL_9-VASb9dpBlXYSM54y5yD631RU_XSafcehY7nsfBc5kcWpjwc8GxgZIYbLAeb8zmYypcobN0jusADfIVWX9H1FBlmSr1qUjkRQx2FegOPd1QRMgfIfTAFZ2ZA'
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
          value={this.props.value}
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

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
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODI1ODc5NzUsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiJlOGQxMjRlMi1mYWNkLTRlYzYtYTNmNS02YjRlYzczNGI3YjkiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.AzRVgMF4Ay760H5qH7CVCo6VufvL5wZrGM7T0sLyvrFskSojvUNRM2JfOqTG4IFpjgysXkesFPCXJY3ZQlsY_aYsehc_Qz7jWU-7NtCLJTgWc0eA59UWRpHXUcUcbBn0TY-PAI5h3Hq6ffwcggUyqsLJt8vnd0ry0hVniDl4HJ8PWcLlH26fgxXKaxp5TMMIVRIpssimlV23UYPyfr2Sulbahh1udbKAX9tk8hWTpUW69WRNhWb_Hrbv28y4hf-syniT3rjKIeDBfP-2zhsD085Pp_o_Q5-xmJPBS8lkoSdlZXHSjdjEICD3Jn5hA6ZiFcUbX6NUl0fGO48aeCmXkA'
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

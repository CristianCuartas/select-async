import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { CardBody, CardFooter, Card } from 'reactstrap';
import SelectCity from './SelectCity';
import SelectDepartment from './SelectDepartment';
import SelectCountry from './SelectCountry';
import { decode } from 'jsonwebtoken';

class FormSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldValue: '',
      newValue: ''
    };
  }
  render() {
    const dataResult = {
      countryId: '',
      departmentId: '',
      cityId: ''
    };
    return (
      <Fragment>
        {/* <FielDepartment /> */}
        <Formik
          enableReinitialize={true}
          initialValues={dataResult}
          validationSchema={Yup.object().shape({
            countryId: Yup.string()
              .required(' Por favor introduzca un país.')
              .ensure(),
            departmentId: Yup.string()
              .required(' Por favor introduzca un departamento.')
              .ensure(),
            cityId: Yup.string()
              .required(' Por favor introduzca una ciudad.')
              .ensure()
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched
            } = props;
            const changeInValue = (oldValue, newValue) => {
              this.setState({
                oldValue,
                newValue
              });
            };
            return (
              <Fragment>
                <Card>
                  {' '}
                  <CardBody>
                    <form className="form" noValidate>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              País
                              <span className="text-danger">*</span>{' '}
                            </label>
                            <SelectCountry
                              name={'countryId'}
                              onChange={e => {
                                setFieldValue('countryId', e.target.value);
                                changeInValue(values.countryId, e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched('countryId', true);
                              }}
                              value={values.countryId}
                              className={`form-control form-control-sm ${errors.countryId &&
                                touched.countryId &&
                                'is-invalid'}`}
                            />

                            {touched ? (
                              <div style={{ color: '#D54B4B' }}>
                                {errors.countryId && touched.countryId ? (
                                  <i class="fa fa-exclamation-triangle" />
                                ) : null}
                                <ErrorMessage name="countryId" />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Departamento
                              <span className="text-danger">*</span>{' '}
                            </label>
                            <FielDepartment
                              oldValueCountryId={this.state.oldValue}
                              newValueCountryId={this.state.newValue}
                              countryId={values.countryId}
                              name="departmentId"
                              className={`form-control form-control-sm ${errors.departmentId &&
                                touched.departmentId &&
                                'is-invalid'}`}
                            />
                            {/* <SelectDepartment
                              countryId={values.countryId}
                              name="departmentId"
                              value={
                                values.countryId === ''
                                  ? (values.departmentId = '')
                                  : values.countryId !== null
                                  ? values.departmentId
                                  : null
                              }
                              onChange={e => {
                                setFieldValue('departmentId', e.target.value);
                              }}
                              onBlur={() => {
                                setFieldTouched('departmentId', true);
                              }}
                              className={`form-control form-control-sm ${errors.departmentId &&
                                touched.departmentId &&
                                'is-invalid'}`}
                            /> */}

                            <div style={{ color: '#D54B4B' }}>
                              {errors.departmentId && touched.departmentId ? (
                                <i class="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="departmentId" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Ciudad
                              <span className="text-danger">*</span>
                            </label>
                            <SelectCity
                              countryId={values.countryId}
                              departmentId={values.departmentId}
                              value={
                                values.countryId === '' ||
                                values.departmentId === ''
                                  ? (values.cityId = '')
                                  : values.countryId !== null ||
                                    values.departmentId !== null
                                  ? values.cityId
                                  : null
                              }
                              name={'cityId'}
                              onChange={e => {
                                setFieldValue('cityId', e.target.value);
                              }}
                              onBlur={e => {
                                setFieldTouched('cityId', true);
                              }}
                              className={`form-control form-control-sm ${errors.cityId &&
                                touched.cityId &&
                                'is-invalid'}`}
                            />
                            <div style={{ color: '#D54B4B' }}>
                              {errors.cityId && touched.cityId ? (
                                <i class="fa fa-exclamation-triangle" />
                              ) : null}
                              <ErrorMessage name="cityId" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardBody>
                  <CardFooter>
                    <div className="pull-right">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                          console.log(values.countryId);
                          console.log(values.departmentId);
                          console.log(values.cityId);
                        }}
                      >
                        Valores Select
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              </Fragment>
            );
          }}
        </Formik>
      </Fragment>
    );
  }
}

const FielDepartment = props => {  
  const [dataDepartment, setDataDepartment] = useState([]);
  async function fetchNewValues(id) {
    let response = await fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/departments/country/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJjY3VhcnRhcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1ODIyNDE5NDgsImF1dGhvcml0aWVzIjpbIlJPTEVfY29tcGFueS5jcmVhdGUiLCJST0xFX2NvbXBhbnkuc2hvdyIsIlJPTEVfY29uZ2xvbWVyYXRlcy5lZGl0IiwiUk9MRV9jb25nbG9tZXJhdGVzLnNob3ciLCJST0xFX2NvbXBhbnkuaW5kZXgiLCJST0xFX2Nvbmdsb21lcmF0ZXMuY3JlYXRlIiwiUk9MRV9jb21wYW55LmRlbGV0ZSIsIlJPTEVfY29uZ2xvbWVyYXRlcy5pbmRleCJdLCJqdGkiOiJiNDg1MDUyNS1hZDQ2LTRjNTctYjY4Zi04ZjI5OWMyMjA0YjQiLCJlbmFibGVkIjp0cnVlLCJjbGllbnRfaWQiOiJmcm9udGVuZGFwcCJ9.BpwElFYfnAu3JthVf14bOJTQL4HDkosyUMXmX1ihFgIvAmKSBmRK9MTSP30PX-FwT4mWIMPmZ73Rla1i-VYfHVUjmLj7m3O1LGoYuXmeeJZwqhCDmzSEK_RHZcvf72B9ydtEc71SQFxvlFG2_Cc0jcUi3x2AFGi7GSPFQm5ipiSGfdHqBl0WP9eSNmw5tEKEOkbv5FpSeYr_s1mHIo4AQ9oAoS2IOtWHJ96-jun00f7feO4G36cYgt1vVIvkIh47rgoSShHsD2wrjixtnwUx9fgPcyFBJeDKm1Y1dcJ8BaMrtBHLXa5bGWnL6W6zUA7WrT-03NOvvJpigrTOb6rx9Q'
        }
      }
    );
    let data = await response.json();
    return data;
  }
  const validateValues = () => {
    if (props.oldValueCountryId !== props.newValueCountryId) {
      fetchNewValues(props.newValueCountryId).then(data =>
        setDataDepartment(data)
      );
    }
  };
  
  // const {
  //   values: { countryId },
  //   setFieldValue
  // } = useFormikContext();
  // const [field, meta] = useField(props);

  // const getDerivedStateFromProps = countryId => {
  //   const [prevCountryId, setPrevCountryId] = useState(null);
  //   if (countryId !== prevCountryId ) {
  //     console.log(prevCountryId);
  //     console.log(countryId);
  //     fetchNewValues(countryId)
  //   }

  // };
  // useLayoutEffect(() => {
  //   validateValues();
  // });
  useEffect(() => {
    // console.log(`old = ${props.oldValueCountryId}`);
    // console.log(`new = ${props.newValueCountryId}`);
    validateValues();
  }, [props.newValueCountryId]);
  return (
    <div>
      {' '}
      <select
        // name={this.props.name}
        // value={this.props.values}
        className={props.className}
        // onChange={this.props.onChange}
        // onBlur={this.props.onBlur}
      >
        <option value={''}>-- Seleccione --</option>
        {dataDepartment.map((aux, id) => {
          return (
            <option key={id} value={aux.id}>
              {aux.name}
            </option>
          );
        })}
      </select>{' '}
    </div>
  );
};

export default FormSelect;

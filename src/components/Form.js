import React, { Fragment, useEffect, useState, useRef } from 'react';
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
  validate = value => {
    let error;
    if (this.state.oldValue !== this.state.newValue) {
      console.log('Cristian');
      error = 'Required';
    }
    return error;
  };
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
                            <Field
                              name="departmentId"
                              component={FielDepartment}
                              oldValueCountryId={this.state.oldValue}
                              newValueCountryId={this.state.newValue}
                            ></Field>
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
                            <Field
                              name="cityId"
                              component={FieldCity}
                              departmentId={values.departmentId}
                            ></Field>
                            {/* 
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
                            /> */}
                            <div style={{ color: '#D54B4B' }}>
                              {errors.cityId && touched.cityId ? (
                                <i className="fa fa-exclamation-triangle" />
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

const FielDepartment = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataDepartment, setDataDepartment] = useState([]);
  const fetchNewValues = id => {
    fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/departments/country/${id}`,
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
        setDataDepartment(data);
      })
      .catch(err => {
        console.log('Error', err);
        setDataDepartment([]);
      });
  };
  const validateValues = () => {
    if (props.oldValueCountryId !== props.newValueCountryId) {
      setDataDepartment([]);
      values.departmentId = '';
      fetchNewValues(props.newValueCountryId);
    }
  };
  const changeInValue = () => {};

  useEffect(() => {
    validateValues();
  }, [props.newValueCountryId]);

  return (
    <div>
      {' '}
      <select
        onChange={e => {
          setFieldValue('departmentId', e.target.value);
          // changeInValue(values.departmentId, e.target.value);
        }}
        onBlur={e => setFieldTouched('departmentId', true)}
        className={`form-control form-control-sm ${errors.departmentId &&
          touched.departmentId &&
          'is-invalid'}`}
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

const FieldCity = ({
  field,
  form: { errors, touched, setFieldTouched, setFieldValue, values },
  ...props
}) => {
  const [dataCity, setDataCity] = useState([]);
  const [valueDepartment, setValueDepartment] = useState(props.departmentId);
  const fetchNewValues = id => {
    fetch(
      `http://192.168.20.187:8090/api/sgdea/service/configuration/cities/department/${id}`,
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
        setDataCity(data);
      })
      .catch(err => {
        console.log('Error', err);
        setDataCity([]);
      });
  };

  const validateValues = () => {
    if (props.oldValueCountryId !== props.newValueCountryId) {
      setDataCity([]);
      values.cityId = '';
      fetchNewValues(props.newValueCountryId);
    }
  };

  // useEffect(() => {
  //   validateValues();
  // }, [props.newValueCountryId]);

  const usePrevious = valueDepartment => {
    const ref = useRef();
    useEffect(() => {
      ref.current = valueDepartment;
    });
    return ref.current;
  };

  return (
    <div>
      {' '}
      <select
        onChange={e => setFieldValue('cityId', e.target.value)}
        onBlur={e => setFieldTouched('cityId', true)}
        className={`form-control form-control-sm ${errors.cityId &&
          touched.cityId &&
          'is-invalid'}`}
      >
        <option value={''}>-- Seleccione --</option>
        {dataCity.map((aux, id) => {
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

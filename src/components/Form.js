import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CardBody, CardFooter, Card } from 'reactstrap';
import SelectCity from './SelectCity';
import SelectDepartment from './SelectDepartment';
import SelectCountry from './SelectCountry';
import { decode } from 'jsonwebtoken';

const Form = props => {
  //   const valueDepartment = value => {
  //     let departmentValue;
  //     if (props.values.countryId === '') {
  //       departmentValue = props.values.departmentId = '';
  //     } else if (props.values.countryId !== null) {
  //       departmentValue = value;
  //     }
  //     return departmentValue;
  //   };
  return (
    <Formik initialValues={{ countryId: '', departmentId: '', cityId: '' }}>
      {props => (
        <div>
          <Card>
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
                          props.setFieldValue('countryId', e.target.value);
                        }}
                        onBlur={() => {
                          props.setFieldTouched('countryId', true);
                        }}
                        value={props.values.countryId}
                        className={`form-control form-control-sm ${props.errors
                          .countryId &&
                          props.touched.countryId &&
                          'is-invalid'}`}
                      />

                      {props.touched ? (
                        <div style={{ color: '#D54B4B' }}>
                          {props.errors.countryId && props.touched.countryId ? (
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
                      <SelectDepartment
                        authorization={props.authorization}
                        t={props.t}
                        countryId={props.values.countryId}
                        name="departmentId"
                        // value={valueSelectDepartment}
                        value={props.values.departmentId}
                        onChange={e => {
                          props.setFieldValue('departmentId', e.target.value);
                        }}
                        onBlur={() => {
                          props.setFieldTouched('departmentId', true);
                        }}
                        className={`form-control form-control-sm ${props.errors
                          .departmentId &&
                          props.touched.departmentId &&
                          'is-invalid'}`}
                      />

                      <div style={{ color: '#D54B4B' }}>
                        {props.errors.departmentId &&
                        props.touched.departmentId ? (
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
                        authorization={props.authorization}
                        t={props.t}
                        countryId={props.values.countryId}
                        departmentId={props.values.departmentId}
                        value={
                          props.values.countryId === '' ||
                          props.values.departmentId === ''
                            ? (props.values.cityId = '')
                            : props.values.countryId !== null ||
                              props.values.departmentId !== null
                            ? props.values.cityId
                            : null
                        }
                        name={'cityId'}
                        onChange={e => {
                          props.setFieldValue('cityId', e.target.value);
                        }}
                        onBlur={e => {
                          props.setFieldTouched('cityId', true);
                        }}
                        className={`form-control form-control-sm ${props.errors
                          .cityId &&
                          props.touched.cityId &&
                          'is-invalid'}`}
                      />
                      <div style={{ color: '#D54B4B' }}>
                        {props.errors.cityId && props.touched.cityId ? (
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
                  // disabled={isSubmitting}
                  // onClick={handleSubmit}
                  onClick={() => {
                    console.log(props.values.countryId);
                    console.log(props.values.departmentId);
                    console.log(props.values.cityId);
                  }}
                >
                  Valores Select
                  {/* {isSubmitting ? (
            <i className=" fa fa-spinner fa-spin" />
          ) : (
            <div>
              <i className="fa fa-save" />{" "}
              {t("app_conglomerado_from_button_guardar")}
            </div>
          )} */}
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export default Form;
